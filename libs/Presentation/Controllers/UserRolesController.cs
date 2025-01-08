using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<IdentityUserRole<Guid>>>> GetUserRoles()
        {
            var userRoles = await _userRoleService.GetUserRolesAsync();
            return Ok(userRoles);
        }

        // GET: api/userroles/{userId}/{roleId}
        [HttpGet("{userId:guid}/{roleId:guid}")]
        public async Task<ActionResult<IdentityUserRole<Guid>>> GetUserRole(Guid userId, Guid roleId)
        {
            var userRole = await _userRoleService.GetUserRoleByIdAsync(userId, roleId);
            if (userRole == null)
                return NotFound();

            return Ok(userRole);
        }

        // POST: api/userroles
        [HttpPost]
        public async Task<ActionResult<IdentityUserRole<Guid>>> CreateUserRole(IdentityUserRole<Guid> userRole)
        {
            var createdUserRole = await _userRoleService.CreateUserRoleAsync(userRole);
            return CreatedAtAction(
                nameof(GetUserRole),
                new { userId = createdUserRole.UserId, roleId = createdUserRole.RoleId },
                createdUserRole
            );
        }

        // DELETE: api/userroles/{userId}/{roleId}
        [HttpDelete("{userId:guid}/{roleId:guid}")]
        public async Task<IActionResult> DeleteUserRole(Guid userId, Guid roleId)
        {
            await _userRoleService.DeleteUserRoleAsync(userId, roleId);
            return NoContent();
        }

        // POST: api/userroles/assign-role
        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRoleToUser(Guid userId, Guid roleId)
        {
            await _userRoleService.AssignRoleToUserAsync(userId, roleId);
            return Ok(new { Message = "Role assigned successfully" });
        }
    }
}
