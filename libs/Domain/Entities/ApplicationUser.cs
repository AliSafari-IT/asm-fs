using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [Required]
        public string FirstName { get; set; } = "FirstName" ?? string.Empty;

        [Required]
        public string LastName { get; set; } = "LastName" ?? string.Empty;

        public string Bio { get; set; } = "my bio" ?? string.Empty;

        public string ProfilePicture { get; set; } = "default.png" ?? string.Empty;

        public string Remark { get; set; } = "remark" ?? string.Empty;

        public bool IsDeleted { get; set; } = false;

        public DateTime? UpdatedAt { get; set; }

        public bool IsAdmin { get; set; } = false;

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

        private bool _isAuthenticated;

        public bool IsAuthenticated => _isAuthenticated;

        public void SetAuthenticationStatus(bool status)
        {
            _isAuthenticated = status;
        }

        public void MarkAsDeleted(Guid userId)
        {
            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
            DeletedBy = userId;
        }

        public void MarkAsDeleted(string userId)
        {
            if (Guid.TryParse(userId, out var parsedId))
            {
                IsDeleted = true;
                DeletedAt = DateTime.UtcNow;
                DeletedBy = parsedId;
            }
            else
            {
                throw new ArgumentException("Invalid userId format. Expected a valid GUID.", nameof(userId));
            }
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
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
