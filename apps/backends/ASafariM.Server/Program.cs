using System.Text;
using Application.Interfaces;
using ASafariM.Server.ConfServices;
using Domain.Repositories;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SecureCore.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddConsole();

// Add services to the container
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
var sv = ServerVersion.AutoDetect(conn);
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(conn, sv));

// Configure Identity with secure settings
ConfigurationServices.ConfigureServices(builder.Services, builder.Environment);
ConfigurationServices.AddCors(builder.Services, "Default");

// Add custom services
builder.Services.AddScoped<ITaskItemService, TaskItemService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserDataChangeLogRepository, UserDataChangeLogRepository>();

// Configure Authentication and Authorization
builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer =
                builder.Configuration["Jwt:Issuer"]
                ?? throw new InvalidOperationException("JWT Issuer not configured"),
            ValidAudience =
                builder.Configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("JWT Audience not configured"),
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]
                        ?? throw new InvalidOperationException("JWT Key not configured")
                )
            ),
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
ConfigurationServices.ApplyCors(app, "Default");

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
