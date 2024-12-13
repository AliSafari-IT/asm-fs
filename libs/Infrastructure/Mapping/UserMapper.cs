using Domain.Entities;
using SecureCore.Models;

namespace Infrastructure.Mapping
{
    public static class UserMapper
    {
        public static ApplicationUser ToApplicationUser(this User user)
        {
            if (user == null)
                return null;

            return new ApplicationUser
            {
                Id = user.Id.ToString(),
                Email = user.Email,
                UserName = user.FullName, // Map FullName to UserName for consistency
                IsDeleted = user.IsDeleted,
                UpdatedAt = user.UpdatedAt,
            };
        }

        public static User ToDomainUser(this ApplicationUser appUser)
        {
            if (appUser == null)
                return null;

            return new User
            {
                Id = Guid.Parse(appUser.Id),
                Email = appUser.Email,
                FullName = appUser.UserName ?? string.Empty,
                IsDeleted = appUser.IsDeleted,
                UpdatedAt = appUser.UpdatedAt,
            };
        }
    }
}
