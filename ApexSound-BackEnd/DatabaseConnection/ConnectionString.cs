using ApexSound_BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace ApexSound_BackEnd.DatabaseConnection
{
    public class ConnectionString : DbContext
    {
        public ConnectionString(DbContextOptions<ConnectionString> options): base(options) { }
        public DbSet<AuthModel> Registeration { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthModel>().Property(e => e.role).HasConversion<string>();
        }
    
    
    }

    



    }
