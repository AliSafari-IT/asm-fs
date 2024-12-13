namespace SecureCore.Models
{
    public class UserReactivationRequest
    {
        public Guid Id { get; set; }
        public required string UserId { get; set; } // Changed from Guid to string to match ApplicationUser.Id
        public required string Email { get; set; }
        public DateTime RequestDate { get; set; }
        public ReactivationRequestStatus Status { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public string? ProcessedBy { get; set; }
        public ApplicationUser? User { get; set; }
    }
}
