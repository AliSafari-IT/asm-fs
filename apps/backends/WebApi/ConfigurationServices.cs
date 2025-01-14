using Application.Abstractions;
using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace WebApi
{
    public static class ConfigurationServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Add repositories
            services.AddScoped<IUserRepository, UserRepository>();

            // Add services
            services.AddScoped<UserService>();

            return services;
        }

        public static void ConfigureServices(IServiceCollection services, IWebHostEnvironment env)
        {
            // Identity Setup
            services
                .AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
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

        public static void AddDatabaseServices(WebApplicationBuilder builder)
        {
            var conn = builder.Configuration.GetConnectionString("DefaultConnection");
            var sv = ServerVersion.AutoDetect(conn);
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(conn, sv)
            );
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("DefaultConnection")
                    )
                )
            );
        }

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
                    {
                        builder
                            .WithOrigins(allowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .SetIsOriginAllowed((origin) => IsOriginAllowed(origin));
                    }
                );
            });
        }

        private static bool IsOriginAllowed(string origin)
        {
            var allowedOrigins =
                Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")?.Split(',')
                ?? new[] { "http://localhost:5173", "http://localhost:3000" };

            return allowedOrigins.Any(allowedOrigin =>
                origin.Equals(allowedOrigin, StringComparison.OrdinalIgnoreCase)
                || allowedOrigin == "*"
            );
        }

        // Use CORS
        internal static void ApplyCors(WebApplication app, string policyName)
        {
            app.UseCors(policyName);
        }
    }
}
