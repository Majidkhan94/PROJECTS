using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Newsletter;
using Backend.Contactus;

namespace Backend.ConnectionStrings
{
    public class ConnectionString : DbContext
    {
        // ConnectionString
        public ConnectionString(DbContextOptions<ConnectionString> options): base(options) { }

        // Database Table
        public DbSet<NewsletterModel> Newsletter { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<ContactusModel> Contactus { get; set; }
        public DbSet<AuthModel> Registeration { get; set; }
       


        // Role Convert into String
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthModel>().Property(r => r.role).HasConversion<string>();

        }


    }
}
