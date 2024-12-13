using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SecureCore.Models;

namespace SecureCore.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public override DbSet<ApplicationUser> Users { get; set; }
        public override DbSet<IdentityUserRole<string>> UserRoles { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<UserReactivationRequest> UserReactivationRequests { get; set; }

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

            // Configure UserReactivationRequest
            modelBuilder.Entity<UserReactivationRequest>(entity =>
            {
                entity.ToTable("user_reactivation_requests");

                entity.Property(e => e.Id).HasColumnType("char(36)").IsRequired();

                entity.Property(e => e.UserId).HasColumnType("varchar(255)").IsRequired();

                entity.Property(e => e.Email).HasColumnType("longtext").IsRequired();

                entity.Property(e => e.RequestDate).HasColumnType("datetime(6)").IsRequired();

                entity.Property(e => e.Status).HasColumnType("int").IsRequired();

                entity
                    .Property(e => e.ProcessedDate)
                    .HasColumnType("datetime(6)")
                    .IsRequired(false);

                entity.Property(e => e.ProcessedBy).HasColumnType("longtext").IsRequired(false);

                // Configure the relationship with ApplicationUser
                entity
                    .HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

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
