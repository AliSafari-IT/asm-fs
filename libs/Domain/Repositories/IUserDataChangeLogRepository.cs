using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Repositories
{
    public interface IUserDataChangeLogRepository
    {
        Task<UserDataChangeLog> AddAsync(UserDataChangeLog log);
        Task<IEnumerable<UserDataChangeLog>> GetUserChangesAsync(string userId);
        Task<UserDataChangeLog> GetByIdAsync(Guid id);
    }
}
