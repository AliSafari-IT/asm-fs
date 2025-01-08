using System;

namespace Domain.Interfaces
{
    public interface IBaseEntity
    {
        Guid Id { get; set; }
        bool IsDeleted { get; set; }
        DateTime? DeletedAt { get; set; }
        Guid? CreatedBy { get; set; }
        Guid? UpdatedBy { get; set; }
        Guid? DeletedBy { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }

        void MarkAsDeleted(Guid userId);
        void Restore();
        void SetCreatedBy(Guid userId);
        void SetUpdatedBy(Guid userId);
    }
}
