// E:\asm-fs\libs\Infrastructure\Repositories\IUserRepository.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    public interface IUserRepository
    {
        Task<ApplicationUser> GetUserByIdAsync(Guid userId); // Fetch user by Id
        Task<ApplicationUser> GetUserByEmailAsync(string email); // Fetch user by email
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync(); // Fetch all users
        Task<ApplicationUser> CreateUserAsync(ApplicationUser user); // Create a new user
        Task<ApplicationUser> UpdateUserAsync(ApplicationUser user); // Update an existing user
        Task<bool> DeleteUserAsync(Guid userId); // Delete user by Id
    }
}
