using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Task = Domain.Entities.Task;
using TaskManagerApi.Services;


namespace TaskManagerApi.Controllers // Replace with your actual namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            var tasks = await _taskService.GetTasksAsync();
            return Ok(tasks);
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(Guid id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<Task>> CreateTask(Task task)
        {
            await _taskService.CreateTaskAsync(task, Guid.NewGuid());
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public IActionResult  UpdateTask(Guid id, Task task)
        {
            var newTask = new Task() { Id = id, Title = task.Title, Description = task.Description, DueDate = task.DueDate };
            _taskService.UpdateTaskAsync(newTask);
            return Ok(newTask);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            await _taskService.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}
