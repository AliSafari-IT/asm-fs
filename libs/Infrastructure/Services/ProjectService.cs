using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repository;

        public ProjectService(IProjectRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Project>> GetAllAsync() => await _repository.GetAllAsync();

        public async Task<Project> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

        public async Task<Project> CreateAsync(Project project)
        {
            project.Id = Guid.NewGuid();
            project.DateCreated = DateTime.UtcNow;
            project.DateModified = DateTime.UtcNow;
            await _repository.AddAsync(project);
            return project;
        }

        public async Task<Project> UpdateAsync(Project project)
        {
            project.DateModified = DateTime.UtcNow;
            await _repository.UpdateAsync(project);
            return project;
        }

        public async Task DeleteAsync(Guid id) => await _repository.DeleteAsync(id);
    }
}
