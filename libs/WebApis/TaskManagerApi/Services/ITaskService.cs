using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Task = Domain.Entities.Task;


namespace TaskManagerApi.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Task>> GetTasksAsync();
        Task<Task> GetTaskByIdAsync(Guid id);

        Task UpdateTaskAsync(Task task);
        Task DeleteTaskAsync(Guid id);
        Task<Task> CreateTaskAsync(Task task, Guid guid);
    }
}
