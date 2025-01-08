using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserService
    {
        // User Management
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync(); // Retrieve all users (including soft-deleted ones if needed)
        Task<IEnumerable<ApplicationUser>> GetActiveUsersAsync(); // Retrieve only active (non-deleted) users
        Task<ApplicationUser> GetUserByIdAsync(Guid id); // Retrieve a user by their unique ID
        Task<ApplicationUser> GetUserByEmailAsync(string email); // Retrieve a user by email
        Task<ApplicationUser> CreateUserAsync(ApplicationUser user); // Create a new user
        Task<ApplicationUser> UpdateUserAsync(ApplicationUser user); // Update an existing user
        Task DeleteUserAsync(Guid id); // Soft delete a user

        // Task Management for Users
        Task<ApplicationUser> AssignTaskToUserAsync(Guid userId, TaskItem task); // Assign a task to a user
        Task<IEnumerable<TaskItem>> GetUserTasksAsync(Guid userId); // Retrieve tasks assigned to a user
    }
}
