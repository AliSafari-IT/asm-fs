using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;



namespace Application.Interfaces
{
    public interface ITaskItemService
    {
        Task<IEnumerable<TaskItem>> GetTaskItemsAsync();
        Task<TaskItem> GetTaskItemByIdAsync(Guid id);

        Task UpdateTaskItemAsync(TaskItem task);
        Task DeleteTaskItemAsync(Guid id);
        Task<TaskItem> AddNewTaskItemAsync(TaskItem task);
    }
}
