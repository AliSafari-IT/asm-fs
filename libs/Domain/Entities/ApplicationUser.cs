using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string Bio { get; set; } = string.Empty;

        public string? ProfilePicture { get; set; }

        public string? Remark { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime? UpdatedAt { get; set; }

        public bool IsAdmin { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? CreatedBy { get; set; }

        public Guid? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }

        public Guid? DeletedBy { get; set; }

        public ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();

        public ICollection<UserReactivationRequest> UserReactivationRequests { get; set; } = new List<UserReactivationRequest>();

        public string FullName => $"{FirstName} {LastName}";

        public DateTime? DateOfBirth { get; set; }

        public bool IsActive { get; set; } = true;

        public string AuthenticationType => "Identity";

        private bool isAuthenticated;

        public bool IsAuthenticated => isAuthenticated;

        public void SetAuthenticationStatus(bool status) {
            isAuthenticated = status;
        }

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
