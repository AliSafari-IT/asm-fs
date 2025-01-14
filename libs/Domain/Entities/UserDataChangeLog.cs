using System.ComponentModel.DataAnnotations;

public class UserDataChangeLog
{
    public Guid Id { get; set; }

    [Required]
    public string Changes { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
