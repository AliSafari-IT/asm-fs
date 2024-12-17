using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using SecureCore.Data;

namespace Infrastructure.Repositories
{
    public class UserDataChangeLogRepository : IUserDataChangeLogRepository
    {
        private readonly ApplicationDbContext _context;

        public UserDataChangeLogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDataChangeLog> AddAsync(UserDataChangeLog log)
        {
            await _context.UserDataChangeLogs.AddAsync(log);
            await _context.SaveChangesAsync();
            return log;
        }

        public async Task<IEnumerable<UserDataChangeLog>> GetUserChangesAsync(string userId)
        {
            return await _context
                .UserDataChangeLogs.Where(l => l.UserId == userId)
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();
        }

        public async Task<UserDataChangeLog> GetByIdAsync(Guid id)
        {
            return await _context.UserDataChangeLogs.FindAsync(id);
        }
    }
}
