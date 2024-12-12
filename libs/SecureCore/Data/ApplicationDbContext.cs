using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SecureCore.Models;

namespace SecureCore.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var sv = ServerVersion.AutoDetect("DefaultConnection");

                optionsBuilder.UseMySql(
                    "DefaultConnection",
                    sv,
                    options => options.MigrationsAssembly("SecureCore")
                );
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapping the 'users' table
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity
                    .Property(e => e.Id)
                    .HasColumnType("char(36)") // Mapping GUID to char(36)
                    .IsRequired();

                entity.Property(e => e.IsAdmin).HasColumnType("tinyint(1)").IsRequired();

                entity.Property(e => e.FullName).HasColumnType("longtext").IsRequired();

                entity.Property(e => e.Email).HasColumnType("longtext").IsRequired();

                entity.Property(e => e.IsDeleted).HasColumnType("tinyint(1)").IsRequired();

                entity.Property(e => e.CreatedAt).HasColumnType("datetime(6)").IsRequired();

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime(6)").IsRequired();

                entity.Property(e => e.DeletedAt).HasColumnType("datetime(6)").IsRequired(false);

                entity
                    .Property(e => e.CreatedBy)
                    .HasColumnType("char(36)") // Mapping GUID to char(36)
                    .IsRequired(false);

                entity
                    .Property(e => e.UpdatedBy)
                    .HasColumnType("char(36)") // Mapping GUID to char(36)
                    .IsRequired(false);

                entity
                    .Property(e => e.DeletedBy)
                    .HasColumnType("char(36)") // Mapping GUID to char(36)
                    .IsRequired(false);
            });

            // Mapping the 'userroles' table
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("userroles");

                entity.Property(e => e.UserId).HasColumnType("char(36)").IsRequired();

                entity.Property(e => e.Role).HasColumnType("int").IsRequired();
            });
        }
    }
}
