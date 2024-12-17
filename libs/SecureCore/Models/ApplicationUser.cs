using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SecureCore.Models
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsDeleted { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsAdmin { get; set; }

        [Required]
        [RegularExpression("^[a-zA-Z0-9]+$", ErrorMessage = "Username must be alphanumeric.")]
        [StringLength(
            20,
            MinimumLength = 3,
            ErrorMessage = "Username must be between 3 and 20 characters."
        )]
        public override string UserName { get; set; }

        public void MarkAsDeleted(Guid id)
        {
            IsDeleted = true;
        }

        public void Restore()
        {
            IsDeleted = false;
        }
    }
}
