using System;

namespace Domain.Entities
{
    public class UserReactivationRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public DateTime RequestDate { get; set; } = DateTime.UtcNow;
        public ReactivationRequestStatus Status { get; set; } = ReactivationRequestStatus.Pending;
        public DateTime? ProcessedDate { get; set; }
        public string? ProcessedBy { get; set; }

        public ApplicationUser User { get; set; } = null!;
    }
}
