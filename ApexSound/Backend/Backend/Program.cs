using Backend.Administration;
using Backend.Category;
using Backend.ConnectionStrings;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Load ENV File
DotNetEnv.Env.Load();

// DB Connection
var Connect = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");
builder.Services.AddDbContext<ConnectionString>(C => C.UseNpgsql(Connect));

// CORS
var frontendUrls = Environment.GetEnvironmentVariable("FRONTEND_URL")
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendUrls)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();

// Scope
builder.Services.AddScoped<IAdminRepo, AdminRepo>();
builder.Services.AddScoped<Token>();
builder.Services.AddScoped<ICloudinary, Cloudinary>();
builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();
// JWT TOKEN 

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("ACCESS_TOKEN"))),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
