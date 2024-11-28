using Application.Interfaces;
using Domain.Entities;
using Domain.Enum;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return await _context.UserRoles.Include(ur => ur.User).ToListAsync();
        }

        // Get user role by ID
        public async Task<UserRole> GetUserRoleByIdAsync(Guid id)
        {
            return await _context.UserRoles.Include(ur => ur.User).FirstOrDefaultAsync(ur => ur.Id == id);
        }

        // Create a new user role
        public async Task<UserRole> CreateUserRoleAsync(UserRole userRole)
        {
            userRole.Id = Guid.NewGuid();
            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();
            return userRole;
        }

        // Update user role
        public async Task UpdateUserRoleAsync(UserRole userRole)
        {
            _context.UserRoles.Update(userRole);
            await _context.SaveChangesAsync();
        }

        // Delete user role
        public async Task DeleteUserRoleAsync(Guid id)
        {
            var userRole = await _context.UserRoles.FindAsync(id);
            if (userRole != null)
            {
                _context.UserRoles.Remove(userRole);
                await _context.SaveChangesAsync();
            }
        }

        // Assign role to a user
        public async Task AssignRoleToUserAsync(Guid userId, UserRoleEnum role)
        {
            var userRole = new UserRole
            {
                UserId = userId,
                Role = role,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = userId // Or fetch current user
            };

            await CreateUserRoleAsync(userRole);
        }
    }
}
