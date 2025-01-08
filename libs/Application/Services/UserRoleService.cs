using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;

namespace Infrastructure.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly ApplicationDbContext _context;

        public UserRoleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<IdentityUserRole<Guid>>> GetUserRolesAsync()
        {
            return await _context.UserRoles.ToListAsync();
        }

        public async Task<IdentityUserRole<Guid>?> GetUserRoleByIdAsync(Guid userId, Guid roleId)
        {
            return await _context.UserRoles.FirstOrDefaultAsync(ur =>
                ur.UserId == userId && ur.RoleId == roleId
            );
        }

        public async Task<IdentityUserRole<Guid>> CreateUserRoleAsync(IdentityUserRole<Guid> userRole)
        {
            if (userRole == null)
                throw new ArgumentNullException(nameof(userRole));

            await _context.UserRoles.AddAsync(userRole);
            await _context.SaveChangesAsync();
            return userRole;
        }

        public async Task DeleteUserRoleAsync(Guid userId, Guid roleId)
        {
            var userRole = await GetUserRoleByIdAsync(userId, roleId);
            if (userRole != null)
            {
                _context.UserRoles.Remove(userRole);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AssignRoleToUserAsync(Guid userId, Guid roleId)
        {
            var userRole = new IdentityUserRole<Guid> { UserId = userId, RoleId = roleId };
            await CreateUserRoleAsync(userRole);
        }
    }
}
