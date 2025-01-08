using System;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class UserDataChangeLog : IBaseEntity
    {
        public string UserId { get; set; }
        public string Action { get; set; }
        public string Changes { get; set; }
        public DateTime Timestamp { get; set; }

        public Guid Id { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid? DeletedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public void MarkAsDeleted(Guid userId)
        {
            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
            DeletedBy = userId;
        }

        public void Restore()
        {
            IsDeleted = false;
            DeletedAt = null;
            DeletedBy = null;
        }

        public void SetCreatedBy(Guid userId)
        {
            CreatedBy = userId;
            CreatedAt = DateTime.UtcNow;
        }

        public void SetUpdatedBy(Guid userId)
        {
            UpdatedBy = userId;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
