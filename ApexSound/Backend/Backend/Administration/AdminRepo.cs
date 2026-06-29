using Backend.Models;
using Backend.ConnectionStrings;
using BCrypt;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
namespace Backend.Administration
{
    public class AdminRepo : IAdminRepo
    {
        private readonly ConnectionString _connectionstring;

        public AdminRepo(ConnectionString connectionstring)
        {
            this._connectionstring = connectionstring;
        }

        // Registeration
        public async Task<AdminModelDTO> AdminRegisteration(AdminModelDTO adminregisteration)
        {
            // Role Check
            var ExistAdmin = await _connectionstring.Registeration.FirstOrDefaultAsync(r => r.role == AuthModel.Role.Admin);
            if (ExistAdmin != null)
                throw new Exception("Admin already exists.");

            // Password Check
            if (adminregisteration.Password != adminregisteration.Confirmpassword) 
            throw new Exception("Password Not Match");



            // Tokens








            // Mapping

            var adminData = new AuthModel()
            {
                Fullname = adminregisteration.Fullname.Trim(),
                Email = adminregisteration.Email.Trim().ToLower(),
                Password = BCrypt.Net.BCrypt.HashPassword(adminregisteration.Password),
                role = AuthModel.Role.Admin,
                Createdat = DateTime.UtcNow
            };

            // 4. Database Save
            await _connectionstring.Registeration.AddAsync(adminData);
            await _connectionstring.SaveChangesAsync();

            return new AdminModelDTO
            {
                Fullname = adminData.Fullname
            };
        }


        public Task<AdminModelDTO> AdminLogin(AdminModelDTO adminlogin)
        {
            throw new NotImplementedException();
        }

        

        public Task<AuthModel> Refreshtoken(AuthModel authmodel)
        {
            throw new NotImplementedException();
        }
    }
}
