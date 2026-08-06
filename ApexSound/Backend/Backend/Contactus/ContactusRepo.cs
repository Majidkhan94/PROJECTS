using Backend.ConnectionStrings;
using Microsoft.EntityFrameworkCore;

namespace Backend.Contactus
{
    public class ContactusRepo : IContactusRepo
    {
        private readonly ConnectionString _connectionString;
        public ContactusRepo(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }

        // List 
        public async Task<List<ContactusModel>> Contactlist()
        {
            return await _connectionString.Contactus.ToListAsync();
        }

        // Add
        public async Task<ContactusModel> Contactadd(ContactusModel contactadd)
        {
            // All fields Required 
            if( string.IsNullOrWhiteSpace(contactadd.fullname) ||
                string.IsNullOrWhiteSpace(contactadd.email) ||
                string.IsNullOrWhiteSpace(contactadd.message))
            { throw new Exception("All fields are required"); }

            //Email 
            if(!contactadd.email.Contains("@") || !contactadd.email.Contains("."))
            { throw new Exception("Invalid email format"); }

            var existemail = await _connectionString.Contactus.FirstOrDefaultAsync(e => e.email == contactadd.email);
            if (existemail != null) { throw new Exception("Email already exists"); }


            await _connectionString.Contactus.AddAsync(contactadd);
            await _connectionString.SaveChangesAsync();
            return contactadd;
        }

        // Delete
        public async Task<bool> Contactdelete(int Id)
        {
            var find = await _connectionString.Contactus.FindAsync(Id);
            if (find != null) { 
                _connectionString.Contactus.Remove(find);
                await _connectionString.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // Count
        public async Task<int> ContactCount()
        {
            return await _connectionString.Contactus.CountAsync();
        }
    }
}
