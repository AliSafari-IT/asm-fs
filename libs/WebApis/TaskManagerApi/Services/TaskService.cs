using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Task = Domain.Entities.Task;
using TaskManagerApi.Services;
using Infrastructure.Data;

namespace TaskManagerApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;
        public TaskService(AppDbContext context) { _context = context; }

        public Task<Task> CreateTaskAsync(Task task, Guid guid)
        {
            var newTask = new Task() { Id = guid, Title = task.Title, Description = task.Description, DueDate = task.DueDate };
            _context.Tasks.Add(newTask);
            _context.SaveChanges();
            return Task.FromResult(newTask); 
        }

        public Task DeleteTaskAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Task> GetTaskByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Task>> GetTasksAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateTaskAsync(Task task)
        {
            throw new NotImplementedException();
        }
    }
}
