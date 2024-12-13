using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task<User> CreateUserAsync(User user);

        Task<User> UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid id);
        Task<User> AssignTaskToUserAsync(Guid userId, TaskItem task);
        Task<IEnumerable<TaskItem>> GetUserTasksAsync(Guid userId);
        Task<IEnumerable<User>> GetUsersAsync();
    }
}
