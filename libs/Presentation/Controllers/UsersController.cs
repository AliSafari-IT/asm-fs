using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UsersController> _logger;

        public UsersController(
            IUserService userService,
            UserManager<ApplicationUser> userManager,
            ILogger<UsersController> logger)
        {
            _userService = userService;
            _userManager = userManager;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetActiveUsersAsync(); // Retrieve active users
            if (!users.Any())
                return NotFound("No users found.");

            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] ApplicationUser user)
        {
            if (user == null)
                return BadRequest("User data is required.");

            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            if (User.Identity?.IsAuthenticated ?? false)
            {
                if (Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var createdBy))
                {
                    user.CreatedBy = createdBy;
                }
            }

            var createdUser = await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] ApplicationUser updatedUser)
        {
            if (updatedUser == null)
                return BadRequest("User data is required.");

            updatedUser.Id = id; // Ensure the ID is consistent
            if (User.Identity?.IsAuthenticated ?? false)
            {
                if (Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var updatedBy))
                {
                    updatedUser.UpdatedBy = updatedBy;
                }
            }

            updatedUser.UpdatedAt = DateTime.UtcNow;

            var user = await _userService.UpdateUserAsync(updatedUser);
            return Ok(user);
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id, [FromBody] DeleteAccountModel model)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound("User not found.");

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
                return BadRequest(new { message = "Invalid password provided." });

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(new { message = "Error deleting user account." });

            return NoContent();
        }

        // GET: api/users/by-email/{email}
        [HttpGet("by-email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // GET: api/users/full-info/{email}
        [HttpGet("full-info/{email}")]
        public async Task<IActionResult> GetUserFullInfo(string email)
        {
            _logger.LogInformation($"Fetching full info for user with email: {email}");

            var aspNetUser = await _userManager.FindByEmailAsync(email);
            if (aspNetUser == null)
            {
                _logger.LogWarning($"User not found in AspNetUsers with email: {email}");
                return NotFound($"User not found in AspNetUsers with email {email}.");
            }

            var userInfo = await _userService.GetUserByEmailAsync(email);
            if (userInfo == null)
            {
                _logger.LogWarning($"User not found in Users table with email: {email}");
                return NotFound($"User not found in Users table with email {email}.");
            }

            var userFullInfo = new
            {
                UserId = aspNetUser.Id,
                aspNetUser.UserName,
                aspNetUser.Email,
                userInfo.CreatedAt,
                userInfo.UpdatedAt,
                userInfo.IsDeleted,
                userInfo.DeletedAt,
            };

            return Ok(userFullInfo);
        }
    }

    public class DeleteAccountModel
    {
        public string Password { get; set; } = string.Empty;
    }
}
