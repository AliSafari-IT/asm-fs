using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string? Bio { get; set; }

        public string? ProfilePicture { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime? UpdatedAt { get; set; }

        public bool IsAdmin { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? CreatedBy { get; set; }

        public Guid? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }

        public Guid? DeletedBy { get; set; }

        // List of TaskItems
        public ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();

        // List of UserReactivationRequests
        public ICollection<UserReactivationRequest> UserReactivationRequests { get; set; } = new List<UserReactivationRequest>();


        // Full Name Property
        public string FullName => $"{FirstName} {LastName}";

        // Optional Details
        public DateTime? DateOfBirth { get; set; }

        public bool IsActive { get; set; } = true;

        public string? AuthenticationType => "Identity";

        public bool IsAuthenticated => true;

        public string? Name => $"{FirstName} {LastName}";

        // Helper Methods
        public void MarkAsDeleted(Guid id)
        {
            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
            DeletedBy = id;
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
        }

        public void SetUpdatedBy(Guid userId)
        {
            UpdatedBy = userId;
        }
    }
}
