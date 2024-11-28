namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public bool IsAdmin { get; set; } = false; // Default to false
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // New property for FullName
        public string FullName { get; set; } = string.Empty; // Default to an empty string

        // Navigation property for the roles this user belongs to
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public virtual ICollection<TaskItem> UserTasks { get; set; } = new List<TaskItem>();
    }
}
