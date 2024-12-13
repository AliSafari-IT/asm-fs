using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enum;
using Infrastructure.Mapping;
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

        // Get all user roles
        public async Task<IEnumerable<UserRole>> GetUserRolesAsync()
        {
            var identityUserRoles = await _context.UserRoles.ToListAsync();
            return identityUserRoles.Select(ur => ur.ToDomainUserRole());
        }

        // Get user role by ID
        public async Task<UserRole> GetUserRoleByIdAsync(Guid id)
        {
            var identityUserRole = await _context.UserRoles.FirstOrDefaultAsync(ur =>
                ur.UserId == id.ToString()
            );
            return identityUserRole?.ToDomainUserRole();
        }

        // Create a new user role
        public async Task<UserRole> CreateUserRoleAsync(UserRole userRole)
        {
            var identityUserRole = userRole.ToIdentityUserRole();
            await _context.UserRoles.AddAsync(identityUserRole);
            await _context.SaveChangesAsync();
            return identityUserRole.ToDomainUserRole();
        }

        // Update user role
        public async Task UpdateUserRoleAsync(UserRole userRole)
        {
            var identityUserRole = userRole.ToIdentityUserRole();
            _context.UserRoles.Update(identityUserRole);
            await _context.SaveChangesAsync();
        }

        // Delete user role
        public async Task DeleteUserRoleAsync(Guid id)
        {
            var userRole = await GetUserRoleByIdAsync(id);
            if (userRole != null)
            {
                var identityUserRole = userRole.ToIdentityUserRole();
                _context.UserRoles.Remove(identityUserRole);
                await _context.SaveChangesAsync();
            }
        }

        // Assign role to a user
        public async Task AssignRoleToUserAsync(Guid userId, UserRoleEnum role)
        {
            var userRole = new UserRole { UserId = userId, Role = role };
            await CreateUserRoleAsync(userRole);
        }
    }
}
