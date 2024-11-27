using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;



        public void MarkAsDeleted(string user)
        {
            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
            UpdatedBy = user;
        }

        public void Restore()
        {
            IsDeleted = false;
            DeletedAt = null;
        }

        public void SetCreatedBy(string user)
        {
            CreatedBy = user;
        }

        public void SetUpdatedBy(string user)
        {
            UpdatedBy = user;
        }
    }
}
