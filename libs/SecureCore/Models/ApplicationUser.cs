using Microsoft.AspNetCore.Identity;

namespace SecureCore.Models
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsDeleted { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsAdmin { get; set; }

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
