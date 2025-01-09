using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Repositories;
using Infrastructure.Repositories;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserDataChangeLogRepository _userDataChangeLogRepository;

        public UserService(
            IUserRepository userRepository,
            IUserDataChangeLogRepository userDataChangeLogRepository
        )
        {
            _userRepository = userRepository;
            _userDataChangeLogRepository = userDataChangeLogRepository;
        }

        // Get all users (including soft-deleted)
        public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        // Get active users (excluding soft-deleted)
        public async Task<IEnumerable<ApplicationUser>> GetActiveUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return users.Where(u => u != null && u.IsDeleted != true);
        }

        // Get user by ID
        public async Task<ApplicationUser> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return user != null && user?.IsDeleted != true ? user : null;
        }

        // Get user by email
        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email is required", nameof(email));

            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null || user?.IsDeleted == true)
                throw new NotFoundException($"User with email {email} not found");

            return user;
        }

        // Create a new user
        public async Task<ApplicationUser> CreateUserAsync(ApplicationUser user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            return await _userRepository.CreateUserAsync(user);
        }

        // Update an existing user
        public async Task<ApplicationUser> UpdateUserAsync(ApplicationUser user)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(user.Id);

            if (existingUser == null || existingUser?.IsDeleted == true)
                throw new NotFoundException("User not found");

            existingUser.Email = user.Email ?? existingUser.Email;
            existingUser.UserName = user.UserName ?? existingUser.UserName;
            existingUser.FirstName = user.FirstName ?? existingUser.FirstName;
            existingUser.LastName = user.LastName ?? existingUser.LastName;
            existingUser.UpdatedBy = user.UpdatedBy;
            existingUser.UpdatedAt = DateTime.UtcNow;

            return await _userRepository.UpdateUserAsync(existingUser);
        }

        // Soft delete a user
        public async Task DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null || user?.IsDeleted == true)
                throw new NotFoundException("User not found");

            user.MarkAsDeleted(Guid.NewGuid()); // Mark as deleted with the current user's ID or a default one
            await _userRepository.UpdateUserAsync(user);
        }

        // Assign a task to a user
        public async Task<ApplicationUser> AssignTaskToUserAsync(Guid userId, TaskItem task)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null || user?.IsDeleted == true)
                throw new NotFoundException("User not found");

            task.AssignedToUserId = userId;
            task.CreatedAt = DateTime.UtcNow;

            // Assuming ApplicationUser has a navigation property for tasks
            if (user.TaskItems == null)
                user.TaskItems = new List<TaskItem>();

            user.TaskItems.Add(task);

            return await _userRepository.UpdateUserAsync(user);
        }

        // Get tasks assigned to a user
        public async Task<IEnumerable<TaskItem>> GetUserTasksAsync(Guid userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null || user?.IsDeleted == true)
                throw new NotFoundException("User not found");

            // Assuming ApplicationUser has a navigation property for tasks
            return user.TaskItems ?? Enumerable.Empty<TaskItem>();
        }
    }
}
