using ApexSound_BackEnd.Administration;
using ApexSound_BackEnd.DatabaseConnection;
using Microsoft.EntityFrameworkCore;
using ApexSound_BackEnd.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();

// Builder Section
builder.Services.AddControllers();

// DB-Connect
var Config = builder.Configuration.GetConnectionString("Defaultconnection");
builder.Services.AddDbContext<ConnectionString>(C => C.UseNpgsql(Config));


// Repository & Scope

builder.Services.AddScoped<IAdminRepo, AdminRepo>();
builder.Services.AddScoped<Tokens>();


// JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))

    };
});

builder.Services.AddAuthorization();






//Apps Section

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
