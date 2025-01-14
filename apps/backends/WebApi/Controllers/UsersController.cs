using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            return NotFound();

        return Ok(user);
    }

    private ApplicationUser MapToApplicationUser(CreateUserModel userModel)
    {
        return new ApplicationUser
        {
            Id = userModel.Id,
            FirstName = userModel.FirstName,
            LastName = userModel.LastName,
            UserName = userModel.UserName,
            Email = userModel.Email,
            CreatedAt = userModel.CreatedAt,
            UpdatedAt = userModel.UpdatedAt,
            CreatedBy = userModel.CreatedBy,
            UpdatedBy = userModel.UpdatedBy,
            IsDeleted = userModel.IsDeleted,
            DeletedAt = userModel.DeletedAt,
            DeletedBy = userModel.DeletedBy,
            IsActive = true // Assuming new users are active
        };
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserModel user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        user.Id = Guid.NewGuid();
        user.CreatedAt = DateTime.UtcNow;

        var applicationUser = MapToApplicationUser(user);
        var password = "DefaultPassword123!";
        var result = await _userManager.CreateAsync(applicationUser, password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return CreatedAtAction(nameof(GetUser), new { id = applicationUser.Id }, user);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new ApplicationUser
        {
            UserName = model.UserName ?? throw new ArgumentNullException(nameof(model.UserName)),
            Email = model.Email ?? throw new ArgumentNullException(nameof(model.Email)),
            FirstName = model.FirstName ?? throw new ArgumentNullException(nameof(model.FirstName)),
            LastName = model.LastName ?? throw new ArgumentNullException(nameof(model.LastName)),
            CreatedAt = DateTime.UtcNow,
        };

        var result = await _userManager.CreateAsync(user, model.Password ?? "DefaultPassword123!");
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { Message = "User registered successfully", UserId = user.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
        {
            return NotFound("User not found.");
        }

        user.MarkAsDeleted(User.Identity?.Name ?? "System");
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok("User deleted successfully.");
    }
}

public class CreateUserModel
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Guid? CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
    public Guid? DeletedBy { get; set; }
    public string Password { get; set; }
}
