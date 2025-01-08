using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Application.Interfaces
{
    public interface IUserRoleService
    {
        Task<IEnumerable<IdentityUserRole<Guid>>> GetUserRolesAsync();
        Task<IdentityUserRole<Guid>?> GetUserRoleByIdAsync(Guid userId, Guid roleId);
        Task<IdentityUserRole<Guid>> CreateUserRoleAsync(IdentityUserRole<Guid> userRole);
        Task DeleteUserRoleAsync(Guid userId, Guid roleId);
        Task AssignRoleToUserAsync(Guid userId, Guid roleId);
    }
}
