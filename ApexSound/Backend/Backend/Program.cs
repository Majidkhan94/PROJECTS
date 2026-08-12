using Backend.Administration;
using Backend.Category;
using Backend.ConnectionStrings;
using Backend.Contactus;
using Backend.Newsletter;
using Backend.Orders;
using Backend.Products;
using Backend.Services;
using Backend.Users;
using Backend.Venders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;


AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Load ENV File
DotNetEnv.Env.Load();

// DB Connection
var Connect = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");
builder.Services.AddDbContext<ConnectionString>(C => C.UseNpgsql(Connect));

// Stripe
Stripe.StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY");

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

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Scope
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IAdminRepo, AdminRepo>();
builder.Services.AddScoped<Token>();
builder.Services.AddScoped<ICloudinary, Cloudinary>();
builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();
builder.Services.AddScoped<INewsletterRepo, NewsletterRepo>();
builder.Services.AddScoped<IContactusRepo, ContactusRepo>();
builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddScoped<IVendersRepo,VendersRepo>();
builder.Services.AddScoped<IOrdersRepo, OrdersRepo>();

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
