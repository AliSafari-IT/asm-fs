using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;

namespace Infrastructure.Services;
public class TaskItemService : ITaskItemService
{
    private readonly ApplicationDbContext _context;

    public TaskItemService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskItem>> GetTaskItemsAsync()
    {
        return await _context.TaskItems.ToListAsync();
    }

    public async Task<TaskItem> GetTaskItemByIdAsync(Guid id)
    {
        return await _context.TaskItems.FindAsync(id);
    }

    public async Task UpdateTaskItemAsync(TaskItem task)
    {
        _context.TaskItems.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTaskItemAsync(Guid id)
    {
        var task = await _context.TaskItems.FindAsync(id);
        if (task != null)
        {
            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
        }
    }

    // This method matches the interface definition and is now aligned
    public async Task<TaskItem> AddNewTaskItemAsync(TaskItem task)
    {
        var newTask = new TaskItem
        {
            Id = Guid.NewGuid(), // Or pass an Id if provided
            Title = task.Title,
            Description = task.Description,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted // Set default value if not provided
        };

        // Add the new task to the database
        _context.TaskItems.Add(newTask);
        await _context.SaveChangesAsync();

        return newTask;
    }
}
