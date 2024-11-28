using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SecureCore.Data;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get list of users, excluding deleted ones
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users
                .Where(u => !u.IsDeleted) // Exclude deleted users
                .ToListAsync();
        }

        // Get a user by Id, excluding deleted ones
        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context.Users
                .Where(u => u.Id == id && !u.IsDeleted) // Exclude deleted users
                .FirstOrDefaultAsync();
        }

        // Create a new user
        public async Task<User> CreateUserAsync(User user)
        {
            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // Update an existing user
        public async Task<User> UpdateUserAsync(User user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == user.Id && !u.IsDeleted); // Only update non-deleted users

            if (existingUser == null)
            {
                return null; // Return null if user is not found or is deleted
            }

            existingUser.FullName = user.FullName;
            existingUser.Email = user.Email;
            existingUser.IsAdmin = user.IsAdmin;
            existingUser.UpdatedAt = DateTime.UtcNow;
            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();

            return existingUser;
        }

        // Mark a user as deleted
        public async Task DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user != null && !user.IsDeleted)
            {
                user.MarkAsDeleted(id);  // Or use the current user's Id here
                await _context.SaveChangesAsync();
            }
        }

        // Get all non-deleted users
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .Where(u => !u.IsDeleted) // Exclude deleted users
                .ToListAsync();
        }

        // Not implemented: Assign task to user (placeholder for future implementation)
        Task<User> IUserService.AssignTaskToUserAsync(Guid userId, TaskItem task)
        {
            throw new NotImplementedException();
        }

        // Not implemented: Get tasks assigned to a user (placeholder for future implementation)
        Task<IEnumerable<TaskItem>> IUserService.GetUserTasksAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
