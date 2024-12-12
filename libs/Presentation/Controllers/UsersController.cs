using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SecureCore.Models;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        // private readonly IHttpContextAccessor _accessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UsersController> _logger;
        private readonly IUserRepository _userRepository;

        public UsersController(
            IUserService userService,
            UserManager<ApplicationUser> userManager,
            IUserRepository userRepository,
            ILogger<UsersController> logger
        )
        {
            _userService = userService;
            _userManager = userManager;
            _userRepository = userRepository;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsersAsync(); // Retrieve all users
            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id); // Get user by Id
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            // Get the logged-in user's ID for CreatedBy, otherwise set to null if not authenticated
            if (User.Identity.IsAuthenticated)
            {
                var loggedinUserIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Convert the string value to Guid? (nullable Guid)
                if (Guid.TryParse(loggedinUserIdString, out var loggedinUserId))
                {
                    user.CreatedBy = loggedinUserId;
                }
                else
                {
                    user.CreatedBy = null; // Set to null if the GUID cannot be parsed
                }
            }

            var createdUser = await _userService.CreateUserAsync(user);

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User updatedUser)
        {
            if (updatedUser == null)
            {
                return BadRequest("User data is required.");
            }
            var userIdentity = User.Identity;

            // Get the logged-in user's ID for UpdatedBy, otherwise set to null if not authenticated
            var updatedByString = userIdentity.IsAuthenticated
                ? User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                : null;

            // Convert the string value to Guid? (nullable Guid)
            if (Guid.TryParse(updatedByString, out var updatedBy))
            {
                updatedUser.UpdatedBy = updatedBy;
            }
            else
            {
                // Set to null if the GUID cannot be parsed
            }
            updatedUser.UpdatedBy = null;

            updatedUser.UpdatedAt = DateTime.UtcNow;

            var user = await _userService.UpdateUserAsync(updatedUser);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Get the logged-in user's ID for DeletedBy, otherwise set to null if not authenticated
            var deletedByString = User.Identity.IsAuthenticated
                ? User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                : null;

            // Convert the string value to Guid? (nullable Guid)
            if (Guid.TryParse(deletedByString, out var deletedBy))
            {
                user.DeletedBy = deletedBy;
            }
            else
            {
                user.DeletedBy = null; // Set to null if the GUID cannot be parsed
            }

            user.DeletedAt = DateTime.UtcNow;

            await _userService.DeleteUserAsync(id);

            return NoContent();
        }

        // GET: api/users/by-email/{email}
        [HttpGet("by-email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        // GET: api/users/full-info/{email}
        [HttpGet("full-info/{email}")]
        public async Task<IActionResult> GetUserFullInfostring(string email)
        {
            _logger.LogInformation($"Fetching full info for user with email: {email}");

            var aspNetUser = await _userManager.FindByEmailAsync(email);
            if (aspNetUser == null)
            {
                _logger.LogWarning($"User not found in AspNetUsers with email: {email}");
                return NotFound($"User not found in AspNetUsers with email {email}.");
            }

            var userInfo = await _userRepository.GetUserByEmailAsync(email);
            if (userInfo == null)
            {
                _logger.LogWarning($"User not found in Users table with email: {email}");
                return NotFound($"User not found in Users table with email {email}.");
            }

            var userFullInfo = new
            {
                UserId = aspNetUser.Id,
                userInfo.Id,
                aspNetUser.UserName,
                aspNetUser.Email,
                aspNetUser.NormalizedUserName,
                userInfo.FullName,
                userInfo.CreatedAt,
                userInfo.UpdatedAt,
                userInfo.IsAdmin,
                userInfo.IsDeleted,
                userInfo.DeletedAt,
            };

            return Ok(userFullInfo);
        }

        // GET: api/users/{id}/user-account-settings
    }
}
