using Application.Abstractions;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ApplicationUser?> GetUserByIdAsync(Guid id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    public async Task RegisterUserAsync(ApplicationUser user)
    {
        // Business logic, e.g., check if user already exists
        if (string.IsNullOrEmpty(user.Email))
            throw new ArgumentException("Email is required.");

        var existingUser = await _userRepository.GetAllAsync();
        if (existingUser.Any(u => u.Email == user.Email))
            throw new InvalidOperationException("User with this email already exists.");

        await _userRepository.AddAsync(user);
    }

    public async Task DeleteUserAsync(Guid id)
    {
        await _userRepository.DeleteAsync(id);
    }
}
