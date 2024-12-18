using System.Text;
using Application.Interfaces;
using ASafariM.Server.ConfServices;
using Domain.Repositories;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SecureCore.Data;
using SecureCore.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddConsole();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Add services to the container.
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
var sv = ServerVersion.AutoDetect(conn);
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(conn, sv));

// Configure Identity with secure settings
ConfServices.ConfigureServices(builder.Services);

builder.Services.AddScoped<ITaskItemService, TaskItemService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
builder.Services.AddScoped<IUserService, UserService>();

// Register the UserRepository with the DI container
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserDataChangeLogRepository, UserDataChangeLogRepository>();

builder.Services.AddHttpContextAccessor();
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
                ?? throw new InvalidOperationException("JWT Issuer is not configured"),
            ValidAudience =
                builder.Configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("JWT Audience is not configured"),
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]
                        ?? throw new InvalidOperationException("JWT Key is not configured")
                )
            ),
        };
    });

builder.Services.AddAuthorization();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "MyLocalHosts",
        builder =>
            builder
                .WithOrigins("http://localhost:5173", "http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
    );
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("MyLocalHosts");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
