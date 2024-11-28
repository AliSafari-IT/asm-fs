using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using SecureCore.Data;

namespace ASafariM.Server.ConfServices
{
    public class ConfServices
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            // Add Identity services and configure them to use your custom ApplicationUser
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                // Identity configuration (optional)
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>() // Your DbContext
            .AddDefaultTokenProviders();

        }

    }
}
