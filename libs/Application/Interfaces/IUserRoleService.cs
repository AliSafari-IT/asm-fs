using Domain.Entities;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserRoleService
    {
        Task<IEnumerable<UserRole>> GetUserRolesAsync();
        Task<UserRole> GetUserRoleByIdAsync(Guid id);
        Task<UserRole> CreateUserRoleAsync(UserRole userRole);
        Task UpdateUserRoleAsync(UserRole userRole);
        Task DeleteUserRoleAsync(Guid id);
        Task AssignRoleToUserAsync(Guid userId, UserRoleEnum role);
    }
}
