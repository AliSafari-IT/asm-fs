using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SecureCore.Data;

namespace Presentation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;
    private readonly ApplicationDbContext _context;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration,
        ILogger<AuthController> logger,
        ApplicationDbContext context
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _logger = logger;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            // Generate email confirmation token
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            // Send email confirmation link
            var confirmationLink = Url.Action(
                "ConfirmEmail",
                "Auth",
                new { userId = user.Id, token },
                Request.Scheme
            );
            await _userManager.SetEmailAsync(
                user,
                "Confirm your email" + " <a href='" + confirmationLink + "'>here</a>"
            );
            return Ok(new { Message = "User registered successfully" });
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        ApplicationUser user = null;

        if (model.UsernameOrEmail.Contains("@"))
        {
            user = await _userManager.FindByEmailAsync(model.UsernameOrEmail);
        }
        else
        {
            user = await _userManager.FindByNameAsync(model.UsernameOrEmail);
        }

        if (user == null)
        {
            return Unauthorized("Invalid credentials.");
        }

        // Check if the account is locked out
        if (await _userManager.IsLockedOutAsync(user))
        {
            var lockoutEnd = await _userManager.GetLockoutEndDateAsync(user);
            return BadRequest(
                new
                {
                    error = $"Account is locked. Try again after {lockoutEnd?.LocalDateTime:HH:mm:ss}",
                }
            );
        }

        // Verify the password manually first
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!isPasswordValid)
        {
            // Increment the access failed count
            await _userManager.AccessFailedAsync(user);

            // Check if the user is now locked out after this failed attempt
            if (await _userManager.IsLockedOutAsync(user))
            {
                var lockoutEnd = await _userManager.GetLockoutEndDateAsync(user);
                return BadRequest(
                    new
                    {
                        error = $"Account is locked due to too many failed attempts. Try again after {lockoutEnd?.LocalDateTime:HH:mm:ss}",
                    }
                );
            }

            // Get remaining attempts before lockout
            var failedAttempts = await _userManager.GetAccessFailedCountAsync(user);
            var maxAttempts = _userManager.Options.Lockout.MaxFailedAccessAttempts;
            var remainingAttempts = maxAttempts - failedAttempts;

            return BadRequest(
                new
                {
                    error = $"Invalid password. {remainingAttempts} attempts remaining before lockout.",
                }
            );
        }

        // Password is valid, reset the access failed count
        await _userManager.ResetAccessFailedCountAsync(user);

        // Sign in the user
        await _signInManager.SignInAsync(user, false);
        var token = GenerateJwtToken(user);
        return Ok(new { Token = token, User = user });
    }

    [HttpPost("update-email")]
    public async Task<IActionResult> UpdateEmail([FromBody] UpdateEmailModel model)
    {
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var token = await _userManager.GenerateChangeEmailTokenAsync(user, model.NewEmail);
        var result = await _userManager.ChangeEmailAsync(user, model.NewEmail, token);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Email updated successfully" });
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("update-username")]
    public async Task<IActionResult> UpdateUsername([FromBody] UpdateUsernameModel model)
    {
        // Check if the new username is valid
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
        {
            return NotFound("User not found.");
        }
        if (!Regex.IsMatch(model.NewUsername, "^[a-zA-Z0-9_]{3,20}$"))
        {
            return BadRequest(
                "Username must be alphanumeric, can include underscores, and be 3-20 characters long."
            );
        }
        if (
            string.IsNullOrWhiteSpace(model.NewUsername)
            || user.UserName == model.NewUsername
            || user.Email == model.NewUsername
            || model.NewUsername.Length < 3
            || model.NewUsername.Length > 20
        )
        {
            return BadRequest("Invalid username.");
        }

        // Update the username
        var result = await _userManager.SetUserNameAsync(user, model.NewUsername);
        if (result.Errors.Any(e => e.Code == "DuplicateUserName"))
        {
            return BadRequest("Username already exists.");
        }

        if (result.Succeeded)
        {
            // Update the user in localstorage
            var userData = await _userManager.FindByIdAsync(model.UserId);
            if (userData != null)
            {
                userData.UserName = model.NewUsername;
                await _userManager.UpdateAsync(userData);
            }
            return Ok(new { Message = "Username updated successfully!" });
        }
        return BadRequest(result.Errors);
    }

    [HttpPost("update-password")]
    public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordModel model)
    {
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var result = await _userManager.ChangePasswordAsync(
            user,
            model.CurrentPassword,
            model.NewPassword
        );

        if (result.Succeeded)
        {
            return Ok(new { Message = "Password updated successfully" });
        }

        return BadRequest(result.Errors);
    }

    // /Users/request-reactivation
    [HttpPost("request-reactivation")]
    public async Task<IActionResult> RequestAccountReactivation(
        [FromBody] ReactivationRequest request
    )
    {
        try
        {
            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            if (!user.IsDeleted)
            {
                return BadRequest(new { Message = "This account is not deleted" });
            }

            // Create a reactivation request record
            var reactivationRequest = new UserReactivationRequest
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Email = user.Email!,
                RequestDate = DateTime.UtcNow,
                Status = ReactivationRequestStatus.Pending,
            };

            _context.UserReactivationRequests.Add(reactivationRequest);
            await _context.SaveChangesAsync();

            // TODO: Send email notification to administrators

            return Ok(
                new
                {
                    Message = "Reactivation request sent successfully. An administrator will review your request.",
                    RequestId = reactivationRequest.Id,
                }
            );
        }
        catch (Exception ex)
        {
            // Log the error
            _logger.LogError(ex, "Error processing reactivation request");
            return StatusCode(
                500,
                new { Message = "An error occurred while processing your request" }
            );
        }
    }

    [HttpPost("approve-reactivation/{requestId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ApproveReactivationRequest(Guid requestId)
    {
        try
        {
            var request = await _context
                .UserReactivationRequests.Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null)
            {
                return NotFound(new { Message = "Reactivation request not found" });
            }

            if (request.Status != ReactivationRequestStatus.Pending)
            {
                return BadRequest(new { Message = "This request has already been processed" });
            }

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            // Restore the user
            user.Restore();
            user.UpdatedAt = DateTime.UtcNow;

            // Update the request status
            request.Status = ReactivationRequestStatus.Approved;
            request.ProcessedDate = DateTime.UtcNow;
            request.ProcessedBy = User.Identity.Name;

            await _context.SaveChangesAsync();

            // TODO: Send email notification to user

            return Ok(new { Message = "Account reactivated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing reactivation approval");
            return StatusCode(
                500,
                new { Message = "An error occurred while processing the request" }
            );
        }
    }

    [HttpPost("reject-reactivation/{requestId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RejectReactivationRequest(
        Guid requestId,
        [FromBody] string reason
    )
    {
        try
        {
            var request = await _context.UserReactivationRequests.FirstOrDefaultAsync(r =>
                r.Id == requestId
            );

            if (request == null)
            {
                return NotFound(new { Message = "Reactivation request not found" });
            }

            if (request.Status != ReactivationRequestStatus.Pending)
            {
                return BadRequest(new { Message = "This request has already been processed" });
            }

            // Update the request status
            request.Status = ReactivationRequestStatus.Rejected;
            request.ProcessedDate = DateTime.UtcNow;
            request.ProcessedBy = User.Identity.Name;

            await _context.SaveChangesAsync();

            // TODO: Send email notification to user with rejection reason

            return Ok(new { Message = "Reactivation request rejected" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing reactivation rejection");
            return StatusCode(
                500,
                new { Message = "An error occurred while processing the request" }
            );
        }
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]
                    ?? throw new InvalidOperationException("JWT Key is not configured")
            )
        );
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"]
                ?? throw new InvalidOperationException("JWT Issuer is not configured"),
            _configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("JWT Audience is not configured"),
            claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class RegisterModel
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginModel
{
    public string UsernameOrEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class UpdateEmailModel
{
    public string UserId { get; set; } = string.Empty;
    public string NewEmail { get; set; } = string.Empty;
}

public class UpdateUsernameModel
{
    public string UserId { get; set; } = string.Empty;
    public string NewUsername { get; set; } = string.Empty;
    public string CurrentEmail { get; set; } = string.Empty;
}

public class UpdatePasswordModel
{
    public string UserId { get; set; } = string.Empty;
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
