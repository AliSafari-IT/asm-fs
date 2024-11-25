using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Task = Domain.Entities.Task; // Import the Task entity from the Domain.Entities namespace

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=asmDB;user=ali;password=Ali+123456/", 
                new MySqlServerVersion(new Version(8, 0, 21)));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity relationships and constraints here if needed
            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.IsCompleted).IsRequired();
                entity.Property(e => e.UserId).IsRequired();
            });
        }
    }
}
