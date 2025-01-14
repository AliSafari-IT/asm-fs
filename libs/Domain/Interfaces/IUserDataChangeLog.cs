using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserDataChangeLog : IBaseEntity
    {
        Guid Id { get; set; }
        string Message { get; set; }
        DateTime CreatedAt { get; set; }
        Guid UserId { get; set; }
    }
}
