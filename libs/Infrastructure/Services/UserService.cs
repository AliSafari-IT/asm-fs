using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
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

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                .Where(u => !u.IsDeleted)
                .ToListAsync();
        }

        public async Task<User> CreateUserAsync(User user)
        {
            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var existingUser = await _context.Users.FindAsync(user.Id);

            if (existingUser == null || existingUser.IsDeleted)
                return null;

            existingUser.FullName = user.FullName;
            existingUser.IsAdmin = user.IsAdmin;
            existingUser.UpdatedAt = DateTime.UtcNow;

            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user != null && !user.IsDeleted)
            {
                user.MarkAsDeleted("System");  // Or the username of the current admin making the update
                await _context.SaveChangesAsync();
            }
        }

        public Task<IEnumerable<User>> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        Task IUserService.UpdateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> AssignTaskToUserAsync(Guid userId, TaskItem task)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TaskItem>> GetUserTasksAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
