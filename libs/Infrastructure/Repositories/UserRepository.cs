using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get user by GUID
        public async Task<ApplicationUser?> GetUserByIdAsync(Guid userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        // Get user by string ID
        public async Task<ApplicationUser?> GetUserByIdAsync(string id)
        {
            if (!Guid.TryParse(id, out var userId))
                throw new ArgumentException("Invalid user ID format", nameof(id));

            return await GetUserByIdAsync(userId);
        }

        // Get all users
        public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
        {
            return await _context.Users.Where(u => !u.IsDeleted).ToListAsync();
        }

        // Create a new user
        public async Task<ApplicationUser> CreateUserAsync(ApplicationUser user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // Update an existing user
        public async Task<ApplicationUser> UpdateUserAsync(ApplicationUser user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var existingUser = await _context.Users.FindAsync(user.Id);
            if (existingUser == null)
                throw new NotFoundException($"User with ID {user.Id} not found");

            existingUser.Email = user.Email ?? existingUser.Email;
            existingUser.UserName = user.UserName ?? existingUser.UserName;
            existingUser.FirstName = user.FirstName ?? existingUser.FirstName;
            existingUser.LastName = user.LastName ?? existingUser.LastName;
            existingUser.UpdatedAt = DateTime.UtcNow;

            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();

            return existingUser;
        }

        // Soft delete a user
        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.IsDeleted = true;
            user.DeletedAt = DateTime.UtcNow;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        // Get user by email
        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                throw new NotFoundException($"User with email {email} not found");

            return user;
        }

    }
}
