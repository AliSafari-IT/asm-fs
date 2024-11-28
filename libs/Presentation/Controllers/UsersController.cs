using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _accessor;

        public UsersController(IUserService userService, IHttpContextAccessor accessor)
        {
            _userService = userService;
            _accessor = accessor;
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

            // Get the logged-in user's ID for UpdatedBy, otherwise set to null if not authenticated
            var updatedByString = User.Identity.IsAuthenticated
                ? User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                : null;

            // Convert the string value to Guid? (nullable Guid)
            if (Guid.TryParse(updatedByString, out var updatedBy))
            {
                updatedUser.UpdatedBy = updatedBy;
            }
            else
            {
                updatedUser.UpdatedBy = null; // Set to null if the GUID cannot be parsed
            }

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
    }
}
