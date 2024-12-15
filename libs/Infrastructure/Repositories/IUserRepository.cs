// E:\asm-fs\libs\Infrastructure\Repositories\IUserRepository.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(Guid userId); // Fetch user by Id
        Task<User> GetUserByEmailAsync(string email); // Fetch user by email
        Task<IEnumerable<User>> GetAllUsersAsync(); // Fetch all users
        Task<User> CreateUserAsync(User user); // Create a new user
        Task<User> UpdateUserAsync(User user); // Update an existing user
        Task<bool> DeleteUserAsync(Guid userId); // Delete user by Id
    }
}
