// E:\asm-fs\libs\Infrastructure\Repositories\UserRepository.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Mapping;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;
using SecureCore.Models;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context; // Your DbContext

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            var applicationUser = await _context
                .Users.Where(u => u.Id.ToString() == userId.ToString())
                .FirstOrDefaultAsync();
            return applicationUser?.ToDomainUser();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Where(u => !u.IsDeleted)
                .ToListAsync();
            return users.Select(u => u.ToDomainUser());
        }

        public async Task<User> CreateUserAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var applicationUser = user.ToApplicationUser();
            await _context.Users.AddAsync(applicationUser);
            await _context.SaveChangesAsync();
            return applicationUser.ToDomainUser();
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var appUser = user.ToApplicationUser();
            _context.Users.Update(appUser);
            await _context.SaveChangesAsync();
            return appUser.ToDomainUser();
        }

        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId.ToString());
            if (user == null)
                return false;

            user.IsDeleted = true;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        Task<User> IUserRepository.GetUserByEmailAsync(string email)
        {
            var appUser = _context.Users.FirstOrDefault(u => u.Email == email);
            return Task.FromResult(appUser?.ToDomainUser());
        }
    }
}
