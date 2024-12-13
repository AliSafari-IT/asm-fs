using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Mapping
{
    public static class UserRoleMapper
    {
        public static IdentityUserRole<string> ToIdentityUserRole(this UserRole userRole)
        {
            if (userRole == null)
                return null;

            return new IdentityUserRole<string>
            {
                UserId = userRole.UserId.ToString(),
                RoleId = userRole.Role.ToString(),
            };
        }

        public static UserRole ToDomainUserRole(this IdentityUserRole<string> identityUserRole)
        {
            if (identityUserRole == null)
                return null;

            return new UserRole
            {
                UserId = Guid.Parse(identityUserRole.UserId),
                Role = Enum.Parse<Domain.Enum.UserRoleEnum>(identityUserRole.RoleId),
            };
        }
    }
}
