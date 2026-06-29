using Backend.Administration;
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


// DB COnnection
DotNetEnv.Env.Load();
var Connect = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");
builder.Services.AddDbContext<ConnectionString>(C => C.UseNpgsql(Connect));


builder.Services.AddControllers();



// Scope
builder.Services.AddScoped<IAdminRepo, AdminRepo>();
builder.Services.AddScoped<Token>();


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
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
