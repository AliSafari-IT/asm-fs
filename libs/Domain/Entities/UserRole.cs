using Domain.Enum;

namespace Domain.Entities
{
    public class UserRole : BaseEntity
    {
        public Guid UserId { get; set; } // User ID referencing the User table
        public UserRoleEnum Role { get; set; } // Enum for role (replacing RoleId)

        // Navigation property (optional, not necessary in this case)
        public virtual User User { get; set; }
    }
}
