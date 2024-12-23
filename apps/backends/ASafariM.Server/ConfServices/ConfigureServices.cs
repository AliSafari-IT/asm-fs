using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SecureCore.Data;
using SecureCore.Models;

namespace ASafariM.Server.ConfServices
{
    public static class ConfigurationServices
    {
        /// <summary>
        /// Configures services for the application, including Identity and cookie settings.
        /// </summary>
        /// <param name="services">The service collection to add configurations to.</param>
        /// <param name="env">The current hosting environment.</param>
        public static void ConfigureServices(IServiceCollection services, IWebHostEnvironment env)
        {
            // Identity Setup
            services
                .AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    // Password settings
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredLength = 8;
                    options.Password.RequiredUniqueChars = 3;
                    options.Password.RequireNonAlphanumeric = true;

                    // Lockout settings
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
                    options.Lockout.MaxFailedAccessAttempts = 5;
                    options.Lockout.AllowedForNewUsers = true;

                    // User settings
                    options.User.RequireUniqueEmail = true;

                    // Sign-in settings (Environment-specific)
                    options.SignIn.RequireConfirmedEmail = env.IsProduction();
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Cookie settings
            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromHours(1);
                options.SlidingExpiration = true;
                options.Cookie.SameSite = SameSiteMode.Strict;
                options.Cookie.SecurePolicy = env.IsDevelopment()
                    ? CookieSecurePolicy.None
                    : CookieSecurePolicy.Always;
            });

            // Enable HTTPS redirection in production
            if (env.IsProduction())
            {
                services.AddHttpsRedirection(options =>
                {
                    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                    options.HttpsPort = 5001;
                });
            }
        }

        // Add CORS
        public static void AddCors(IServiceCollection services, string policyName)
        {
            var allowedOrigins =
                Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")?.Split(',')
                ?? new[] { "http://localhost:5173", "http://localhost:3000" };

            services.AddCors(options =>
            {
                options.AddPolicy(
                    policyName,
                    builder =>
                        builder
                            .WithOrigins(allowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithExposedHeaders("X-Custom-Header")
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .Build()
                );
            });
        }

        // Use CORS
        internal static void ApplyCors(WebApplication app, string policyName)
        {
            app.UseCors(policyName);
        }
    }
}
