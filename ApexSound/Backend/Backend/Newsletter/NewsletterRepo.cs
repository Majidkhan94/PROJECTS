using Backend.ConnectionStrings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Backend.Newsletter
{
    public class NewsletterRepo : INewsletterRepo
    {
        private readonly ConnectionString _connectionString;
        public NewsletterRepo(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<NewsletterModel> AddNewsletter(NewsletterModel addnewsletter)
        {
            var existEmail = await _connectionString.Newsletter
                .FirstOrDefaultAsync(e => e.email == addnewsletter.email);

            if (existEmail != null)
            {
                throw new Exception("Email already exists");
            }

            var add = await _connectionString.Newsletter.AddAsync(addnewsletter);
            await _connectionString.SaveChangesAsync();
            return addnewsletter;
        }

        public async Task<bool> DeleteNewsletter(int Id)
        {   
            var find = await _connectionString.Newsletter.FindAsync(Id);
            if(find != null)
            {
                _connectionString.Newsletter.Remove(find);
                _connectionString.SaveChangesAsync();
                return true;
            }
            return false;
            
        }

        public async Task<List<NewsletterModel>> ListNewsletter()
        {
            var list = await _connectionString.Newsletter.ToListAsync() ;
            return list;
        }
    }
}
