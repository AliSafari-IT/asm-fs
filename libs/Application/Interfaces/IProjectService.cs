using Domain.Entities;

namespace Application.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project> GetByIdAsync(Guid id);
        Task<Project> CreateAsync(Project project);
        Task<Project> UpdateAsync(Project project);
        Task DeleteAsync(Guid id);
    }
}
