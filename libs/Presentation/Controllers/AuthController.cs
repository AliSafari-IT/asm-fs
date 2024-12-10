using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SecureCore.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Presentation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<ApplicationUser> userManager,
                          SignInManager<ApplicationUser> signInManager,
                          IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
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
            return BadRequest(new { 
                error = $"Account is locked. Try again after {lockoutEnd?.LocalDateTime:HH:mm:ss}"
            });
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
                return BadRequest(new { 
                    error = $"Account is locked due to too many failed attempts. Try again after {lockoutEnd?.LocalDateTime:HH:mm:ss}"
                });
            }

            // Get remaining attempts before lockout
            var failedAttempts = await _userManager.GetAccessFailedCountAsync(user);
            var maxAttempts = _userManager.Options.Lockout.MaxFailedAccessAttempts;
            var remainingAttempts = maxAttempts - failedAttempts;

            return BadRequest(new { 
                error = $"Invalid password. {remainingAttempts} attempts remaining before lockout."
            });
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
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        user.UserName = model.NewUsername;
        var result = await _userManager.UpdateAsync(user);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Username updated successfully!" });
        }
        // throw new Exception("Failed to update username.");
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

        var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Password updated successfully" });
        }

        return BadRequest(result.Errors);
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
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
