using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public async Task<IEnumerable<UserDataChangeLog>> GetAllAsync()
        {
            return await _context.UserDataChangeLogs.ToListAsync();
        }

        public async Task<UserDataChangeLog> GetByIdAsync(Guid id)
        {
            return await _context.UserDataChangeLogs.FindAsync(id);
        }

        public async Task AddAsync(UserDataChangeLog entity)
        {
            await _context.UserDataChangeLogs.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(UserDataChangeLog entity)
        {
            _context.UserDataChangeLogs.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _context.UserDataChangeLogs.FindAsync(id);
            if (entity != null)
            {
                _context.UserDataChangeLogs.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<UserDataChangeLog>> FindAsync(
            Func<UserDataChangeLog, bool> predicate
        )
        {
            return await Task.FromResult(_context.UserDataChangeLogs.Where(predicate).ToList());
        }

        public async Task<IEnumerable<UserDataChangeLog>> GetUserChangesAsync(string userId)
        {
            return await _context
                .UserDataChangeLogs.Where(l => l.UserId == userId)
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();
        }

        public async Task<IEnumerable<UserDataChangeLog>> FindAsync(
            Expression<Func<UserDataChangeLog, bool>> predicate
        )
        {
            try
            {
                return await _context.UserDataChangeLogs.Where(predicate).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log the exception (using ILogger if needed)
                throw new InvalidOperationException("Error while querying UserDataChangeLog", ex);
            }
        }
    }
}
