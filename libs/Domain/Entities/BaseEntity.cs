using System;

namespace Domain.Entities
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public Guid? CreatedBy { get; set; } // Changed to Guid to store user ID
        public Guid? UpdatedBy { get; set; } // Changed to Guid to store user ID
        public Guid? DeletedBy { get; set; } // Changed to Guid to store user ID

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Mark entity as deleted
        public void MarkAsDeleted(Guid userId)
        {
            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
            DeletedBy = userId;
            UpdatedBy = userId;
        }

        // Restore entity from deleted state
        public void Restore()
        {
            IsDeleted = false;
            DeletedAt = null;
            DeletedBy = null;
        }

        // Set CreatedBy to the current user ID and set CreatedAt
        public void SetCreatedBy(Guid userId)
        {
            CreatedBy = userId;
            CreatedAt = DateTime.UtcNow;  // Automatically set CreatedAt when a new entity is created
        }

        // Set UpdatedBy to the current user ID and set UpdatedAt
        public void SetUpdatedBy(Guid userId)
        {
            UpdatedBy = userId;
            UpdatedAt = DateTime.UtcNow;  // Automatically set UpdatedAt when the entity is updated
        }
    }
}
