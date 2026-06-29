using Backend.Administration;
using Backend.ConnectionStrings;
using Microsoft.EntityFrameworkCore;




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





var app = builder.Build();




app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
