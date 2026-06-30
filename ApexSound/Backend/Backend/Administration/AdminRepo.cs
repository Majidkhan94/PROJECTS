using Backend.Models;
using Backend.ConnectionStrings;
using BCrypt;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Backend.Services;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Administration
{
    public class AdminRepo : IAdminRepo
    {
        private readonly ConnectionString _connectionstring;
        private readonly Token _token;
        public AdminRepo(ConnectionString connectionstring, Token token)
        {
            this._connectionstring = connectionstring;
            this._token = token;
        }

        //////////////////// Registeration ////////////////////
        
        public async Task<AdminRegDTO> AdminRegisteration(AdminRegDTO adminregisteration)
        {
            // Role Check
            var ExistAdmin = await _connectionstring.Registeration.FirstOrDefaultAsync(r => r.role == AuthModel.Role.Admin);
            if (ExistAdmin != null)
                throw new Exception("Admin already exists.");

            // Password Check
            if (adminregisteration.Password != adminregisteration.Confirmpassword) 
            throw new Exception("Password Not Match");

            // Tokens
            var accesstoken = Token.GenerateAccessToken(adminregisteration.Email);
            var refreshtoken = Token.GenerateRefreshToken();

            // Mapping

            var adminData = new AuthModel()
            {
                Fullname = adminregisteration.Fullname.Trim(),
                Email = adminregisteration.Email.Trim().ToLower(),
                Password = BCrypt.Net.BCrypt.HashPassword(adminregisteration.Password),
                role = AuthModel.Role.Admin,
                Createdat = DateTime.UtcNow,
                Refreshtoken = refreshtoken,
                Refreshtokenexpiry = DateTime.UtcNow.AddDays(7),
                
            };

            // 4. Database Save
            await _connectionstring.Registeration.AddAsync(adminData);
            await _connectionstring.SaveChangesAsync();

            return new AdminRegDTO
            {
                Fullname = adminData.Fullname,
                Email = adminData.Email.Trim().ToLower(),
                Accesstoken = accesstoken,
                Refreshtoken = refreshtoken
            };
        }


        //////////////////// Admin Login ////////////////////
        
        public async Task<AdminLogDTO> AdminLogin(AdminLogDTO adminlogin)
        {

            // Email and Password

            var ExistEmail = await _connectionstring.Registeration.FirstOrDefaultAsync(E => E.Email == adminlogin.Email);

            if (ExistEmail == null) return null;

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(adminlogin.Password, ExistEmail.Password);
            if (!isPasswordValid) return null;

            // Token

            var accesstoken = Token.GenerateAccessToken(adminlogin.Email);
            var refreshtoken = Token.GenerateRefreshToken();

            await _connectionstring.SaveChangesAsync();

            return new AdminLogDTO
            {
                Email = ExistEmail.Email,
                Accesstoken = accesstoken,
                Refreshtoken = refreshtoken
                
            };
        }

    }
}
