using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _service;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IProjectService service, ILogger<ProjectsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                _logger.LogInformation("Fetching all projects.");
                var projects = await _service.GetAllAsync();
                _logger.LogInformation($"Retrieved {projects.Count()} projects.");
                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching projects.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                _logger.LogInformation($"Fetching project with ID: {id}");
                var project = await _service.GetByIdAsync(id);

                if (project == null)
                {
                    _logger.LogWarning($"Project with ID: {id} not found.");
                    return NotFound($"Project with ID {id} not found.");
                }

                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching project with ID: {id}");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            try
            {
                _logger.LogInformation($"Creating a new project: {project.Title}");
                var createdProject = await _service.CreateAsync(project);
                _logger.LogInformation($"Project created with ID: {createdProject.Id}");
                return CreatedAtAction(
                    nameof(GetById),
                    new { id = createdProject.Id },
                    createdProject
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating a project.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Project project)
        {
            try
            {
                if (id != project.Id)
                {
                    _logger.LogWarning("Project ID mismatch.");
                    return BadRequest("Project ID mismatch.");
                }

                _logger.LogInformation($"Updating project with ID: {id}");
                var updatedProject = await _service.UpdateAsync(project);
                _logger.LogInformation($"Project with ID: {id} updated successfully.");
                return Ok(updatedProject);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating project with ID: {id}");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                _logger.LogInformation($"Deleting project with ID: {id}");
                await _service.DeleteAsync(id);
                _logger.LogInformation($"Project with ID: {id} deleted successfully.");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting project with ID: {id}");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
