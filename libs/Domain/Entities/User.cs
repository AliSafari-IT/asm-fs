using System;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public bool IsAdmin { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;

        // ToDO:: add navigation properties for related entities (e.g., UserRoles)
    }
}
