using System.Diagnostics;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SecureCore.Data
{
    [DebuggerDisplay($"{{{nameof(GetDebuggerDisplay)}(),nq}}")]
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<UserReactivationRequest> UserReactivationRequests { get; set; }
        public DbSet<UserDataChangeLog> UserDataChangeLogs { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }

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

            // Configure IdentityUserRole<string> (userroles table)
            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("userroles"); // Use the existing table name
                entity.Property(e => e.UserId).HasColumnType("char(36)").IsRequired();
                entity.Property(e => e.RoleId).HasColumnType("int").IsRequired(); // Assume RoleId maps to an integer
            });

            // Configure UserReactivationRequest
            modelBuilder.Entity<UserReactivationRequest>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.UserId).IsRequired();

                entity
                    .HasOne(e => e.User)
                    .WithMany(u => u.UserReactivationRequests)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade); // Optional delete behavior
            });

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsRequired(false); // Mark as optional
            });

            // Mapping the 'users' table
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("users");

                entity
                    .Property(e => e.Id)
                    .HasColumnType("char(36)") // Mapping GUID to char(36)
                    .IsRequired();

                entity.Property(e => e.IsAdmin).HasColumnType("tinyint(1)").IsRequired();

                entity.Property(e => e.FirstName).HasColumnType("longtext").IsRequired();

                entity.Property(e => e.LastName).HasColumnType("longtext").IsRequired();

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
        }

        private string GetDebuggerDisplay()
        {
            return ToString();
        }
    }
}
