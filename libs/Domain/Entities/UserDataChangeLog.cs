using System;

namespace Domain.Entities
{
    public class UserDataChangeLog : BaseEntity
    {
        public string UserId { get; set; }
        public string Action { get; set; }
        public string Changes { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
