using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SecureGateDbContext: IdentityDbContext
    {

        public SecureGateDbContext(DbContextOptions<SecureGateDbContext> options) : base(options)
        {
        }

       // public DbSet<IApplicationUser> Users { get; set; }
    }
}
