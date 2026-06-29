using Microsoft.EntityFrameworkCore;
using Backend.Models;
namespace Backend.ConnectionStrings
{
    public class ConnectionString : DbContext
    {
        // ConnectionString
        public ConnectionString(DbContextOptions<ConnectionString> options): base(options) { }

        // Database Table
        public DbSet<AuthModel> Registeration { get; set; }

        // Role Convert into String
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthModel>().Property(r => r.role).HasConversion<string>();
        }


    }
}
