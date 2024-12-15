using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Repositories;
using Infrastructure.Mapping;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserDataChangeLogRepository _userDataChangeLogRepository;
        private readonly ApplicationDbContext _context;

        public UserService(
            IUserRepository userRepository,
            IUserDataChangeLogRepository userDataChangeLogRepository,
            ApplicationDbContext context
        )
        {
            _userRepository = userRepository;
            _userDataChangeLogRepository = userDataChangeLogRepository;
            _context = context;
        }

        // Get list of users, excluding deleted ones
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return (
                await _context
                    .Users.Where(u => !u.IsDeleted) // Exclude deleted users
                    .ToListAsync()
            ).Select(u => u.ToDomainUser());
        }

        // Get a user by Id, excluding deleted ones
        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context
                .Users.Where(u => u.Id.Equals(id) && !u.IsDeleted)
                .FirstOrDefaultAsync()
                .ContinueWith(t => t.Result?.ToDomainUser());
        }

        // Create a new user
        public async Task<User> CreateUserAsync(User user)
        {
            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            var applicationUser = user.ToApplicationUser();
            _context.Users.Add(applicationUser);
            await _context.SaveChangesAsync();
            return applicationUser.ToDomainUser();
        }

        // Update an existing user with GDPR compliance
        public async Task<User> UpdateUserAsync(User user)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(user.Id);
            if (existingUser == null)
            {
                throw new NotFoundException("User not found");
            }

            // Log the changes
            var changes = new Dictionary<string, object>();
            if (existingUser.Email != user.Email)
            {
                if (!IsValidEmail(user.Email))
                {
                    throw new ValidationException("Invalid email format");
                }
                changes.Add("Email", new { Old = existingUser.Email, New = user.Email });
            }
            if (existingUser.UserName != user.FullName)
            {
                changes.Add(
                    "DisplayName",
                    new { Old = existingUser.UserName, New = user.FullName }
                );
            }

            var updatedUser = await _userRepository.UpdateUserAsync(user);

            // Create change log entry
            if (changes.Count != 0)
            {
                var changeLog = new Domain.Entities.UserDataChangeLog
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id.ToString(),
                    Action = "UpdateUserData",
                    Changes = System.Text.Json.JsonSerializer.Serialize(changes),
                    Timestamp = DateTime.UtcNow,
                };
                await _userDataChangeLogRepository.AddAsync(changeLog);
            }

            return updatedUser;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        // Mark a user as deleted
        public async Task DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user != null && !user.IsDeleted)
            {
                user.MarkAsDeleted(id); // Or use the current user's Id here
                await _context.SaveChangesAsync();
            }
        }

        // Get all non-deleted users
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return (IEnumerable<User>)
                await _context
                    .Users.Where(u => !u.IsDeleted) // Exclude deleted users
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
