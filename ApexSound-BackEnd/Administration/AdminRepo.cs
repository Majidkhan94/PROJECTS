using ApexSound_BackEnd.Models;
using ApexSound_BackEnd.DatabaseConnection;
using BCrypt;
using Microsoft.EntityFrameworkCore;
using ApexSound_BackEnd.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ApexSound_BackEnd.Administration
{
    public class AdminRepo : IAdminRepo
    {
        private readonly ConnectionString _Database;
        private readonly Tokens _tokens;
        public AdminRepo( ConnectionString connectionString, Tokens tokens)
        {
            _Database = connectionString;
            _tokens = tokens;
        }

        // ====== Registeration ======
        public async Task<AuthModel> AdminRegisteration(AdminRegisteration AdminRegisteration)
        {
            // Role Varification
            var RoleExist = await _Database.Registeration.FirstOrDefaultAsync(E => E.role == AuthModel.Role.admin);
            if(RoleExist !=null)
            {
                throw new Exception("Admin Already Have");
            }

            // Password Varification
            if(AdminRegisteration.password != AdminRegisteration.confirmpassword)
            {
                throw new Exception("Password Not Match");
            }

            // Mapping
            var AdminData = new AuthModel()
            {
                fullname = AdminRegisteration.fullname.Trim(),
                email = AdminRegisteration.email.Trim().ToLower(),
                password = BCrypt.Net.BCrypt.HashPassword(AdminRegisteration.password),
                role = AuthModel.Role.admin,
                createdat = DateTime.UtcNow
            };

            // AccessToken 

            var accesstoken = _tokens.GenerateAccessToken(AdminData.email, AdminData.role.ToString());
            var refreshtoken = _tokens.GenerateRefreshToken();
            AdminData.refreshtoken = refreshtoken;
            AdminData.refreshtokenexpiry = _tokens.GetRefreshTokenExpiry();
            AdminData.accesstoken = accesstoken;

            
            // Save Data
            await _Database.Registeration.AddAsync(AdminData);
            await _Database.SaveChangesAsync();
            return AdminData;
                
        }

        // ====== Login ======
        public async Task<AuthModel> AdminLogin(AdminLogin AdminLogin)
        {
            // VerifyEmail
            var VerifyEmail = await _Database.Registeration.FirstOrDefaultAsync(e => e.email == AdminLogin.email.Trim().ToLower());
            if (VerifyEmail == null) throw new Exception("Invalid email or password");

            // VerifyPass
            bool VerifyPass = BCrypt.Net.BCrypt.Verify(AdminLogin.password, VerifyEmail.password);
            if (!VerifyPass) throw new Exception("Invalid email or password");

            //Token
            var accesstoken = _tokens.GenerateAccessToken(VerifyEmail.email, VerifyEmail.role.ToString());
            var refreshtoken = _tokens.GenerateRefreshToken(); 

            VerifyEmail.refreshtoken = refreshtoken;
            VerifyEmail.refreshtokenexpiry = _tokens.GetRefreshTokenExpiry();
            VerifyEmail.accesstoken = accesstoken;

            await _Database.SaveChangesAsync();
            return VerifyEmail;







            return null;

        }
        
        
        
        
        
        
        // ====== Profile Update ======
        public Task<AuthModel> Adminprofileupdate(Adminprofileupdate Adminprofileupdate)
        {
            throw new NotImplementedException();
        }

        // RefreshToken
        public async Task<AuthModel> RefreshToken(int Id, string refreshtoken, DateTime? refreshtokenexpiry)
        {
            var UserId = await _Database.Registeration.FindAsync(Id);
            {
                UserId.refreshtoken = refreshtoken;
                UserId.refreshtokenexpiry = refreshtokenexpiry;
                await _Database.SaveChangesAsync();
                return UserId;
            }
        }
    }
}
