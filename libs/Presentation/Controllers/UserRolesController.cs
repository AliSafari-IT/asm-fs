using Application.Interfaces;
using Domain.Entities;
using Domain.Enum;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly IUserRoleService _userRoleService;

        public UserRolesController(IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }

        // GET: api/userroles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetUserRoles()
        {
            var userRoles = await _userRoleService.GetUserRolesAsync();
            return Ok(userRoles);
        }

        // GET: api/userroles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRole>> GetUserRole(Guid id)
        {
            var userRole = await _userRoleService.GetUserRoleByIdAsync(id);

            if (userRole == null)
            {
                return NotFound();
            }

            return Ok(userRole);
        }

        // POST: api/userroles
        [HttpPost]
        public async Task<ActionResult<UserRole>> CreateUserRole(UserRole userRole)
        {
            var createdUserRole = await _userRoleService.CreateUserRoleAsync(userRole);
            return CreatedAtAction(nameof(GetUserRole), new { id = createdUserRole.Id }, createdUserRole);
        }

        // PUT: api/userroles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserRole(Guid id, UserRole userRole)
        {
            if (id != userRole.Id)
            {
                return BadRequest();
            }

            await _userRoleService.UpdateUserRoleAsync(userRole);
            return NoContent();
        }

        // DELETE: api/userroles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserRole(Guid id)
        {
            await _userRoleService.DeleteUserRoleAsync(id);
            return NoContent();
        }

        // POST: api/userroles/assign-role
        [HttpPost("assign-role")]
        public async Task<ActionResult> AssignRoleToUser(Guid userId, UserRoleEnum role)
        {
            await _userRoleService.AssignRoleToUserAsync(userId, role);
            return Ok(new { Message = "Role assigned successfully" });
        }
    }
}
