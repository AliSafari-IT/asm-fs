using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SecureCore.Models;
using Domain.Entities;
using Task = Domain.Entities.Task;

namespace SecureCore.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var sv = ServerVersion.AutoDetect("DefaultConnection");

                optionsBuilder
                    .UseMySql("DefaultConnection",sv,
                        options => options.MigrationsAssembly("SecureCore") // Set migrations assembly explicitly
                    );
            }
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}
