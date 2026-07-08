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
        private readonly ICloudinary _cloudinary;
        public AdminRepo(ConnectionString connectionstring, Token token, ICloudinary cloudinary)
        {
            this._connectionstring = connectionstring;
            this._token = token;
            this._cloudinary = cloudinary;
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

            // Mapping
            var adminData = new AuthModel()
            {
                Fullname = adminregisteration.Fullname.Trim(),
                Email = adminregisteration.Email.Trim().ToLower(),
                Password = BCrypt.Net.BCrypt.HashPassword(adminregisteration.Password),
                role = AuthModel.Role.Admin,
                Createdat = DateTime.UtcNow,
                Refreshtokenexpiry = DateTime.UtcNow.AddDays(7),
            };

            // Database Save (pehle save, taake Id generate ho jaye)
            await _connectionstring.Registeration.AddAsync(adminData);
            await _connectionstring.SaveChangesAsync();

            // Tokens (ab adminData.Id available hai)
            var accesstoken = Token.GenerateAccessToken(adminData.Id, adminData.Email, AuthModel.Role.Admin.ToString());
            var refreshtoken = Token.GenerateRefreshToken();

            // Refresh token DB mein save karein
            adminData.Refreshtoken = refreshtoken;
            await _connectionstring.SaveChangesAsync();

            return new AdminRegDTO
            {
                Fullname = adminData.Fullname,
                Email = adminData.Email,
                Accesstoken = accesstoken,
                Refreshtoken = refreshtoken,
                Role = adminData.role.ToString()
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
            var accesstoken = Token.GenerateAccessToken(ExistEmail.Id, ExistEmail.Email, AuthModel.Role.Admin.ToString());
            var refreshtoken = Token.GenerateRefreshToken();

            ExistEmail.Refreshtoken = refreshtoken;
            await _connectionstring.SaveChangesAsync();

            return new AdminLogDTO
            {
                Id = ExistEmail.Id,
                Email = ExistEmail.Email,
                Accesstoken = accesstoken,
                Refreshtoken = refreshtoken,
                Role = ExistEmail.role.ToString()
            };
        }

        //////////////////// Admin Update ////////////////////

        public async Task<AdminUpdateDTO> AdminUpdate(int Id, AdminUpdateDTO AdminUpdate)
        {
            // Find By Id
            var UpdateAdmin = await _connectionstring.Registeration.FindAsync(Id);
            if (UpdateAdmin == null) throw new Exception("Admin not found");

            // Picture Upload
            if (AdminUpdate.ProfilePictureUrl != null)
            {
                var UploadImage = await _cloudinary.UploadImage(AdminUpdate.ProfilePictureUrl, "AdminProfilePicture");
                UpdateAdmin.ProfilePictureUrl = UploadImage;
            }
            // Password Update
            if (!string.IsNullOrWhiteSpace(AdminUpdate.Password))
            {
                if (AdminUpdate.Password != AdminUpdate.Confirmpassword)
                    throw new Exception("Password Not Match");

                UpdateAdmin.Password = BCrypt.Net.BCrypt.HashPassword(AdminUpdate.Password);
            }

            UpdateAdmin.Fullname = AdminUpdate.Fullname ?? UpdateAdmin.Fullname;
            UpdateAdmin.Email = AdminUpdate.Email ?? UpdateAdmin.Email;
            UpdateAdmin.Age = AdminUpdate.Age ?? UpdateAdmin.Age;
            UpdateAdmin.PhoneNumber = AdminUpdate.PhoneNumber ?? UpdateAdmin.PhoneNumber;
            UpdateAdmin.Address = AdminUpdate.Address ?? UpdateAdmin.Address;
            UpdateAdmin.City = AdminUpdate.City ?? UpdateAdmin.City;
            UpdateAdmin.Gender = AdminUpdate.Gender ?? UpdateAdmin.Gender;
            UpdateAdmin.DateOfBirth = AdminUpdate.DateOfBirth ?? UpdateAdmin.DateOfBirth;

            await _connectionstring.SaveChangesAsync();
            return null;
        }

        //////////////////// Admin Profile ////////////////////

        public async Task<AdminProfileDTO> AdminProfile(int Id)
        {
            var AdminProfile = await _connectionstring.Registeration.FindAsync(Id);
            if (AdminProfile == null) throw new Exception("Admin not found");

            return new AdminProfileDTO
            {
                Fullname = AdminProfile.Fullname,
                Email = AdminProfile.Email,
                Age = AdminProfile.Age,
                PhoneNumber = AdminProfile.PhoneNumber,
                Address = AdminProfile.Address,
                City = AdminProfile.City,
                Gender = AdminProfile.Gender,
                DateOfBirth = AdminProfile.DateOfBirth,
                ProfilePictureUrl = AdminProfile.ProfilePictureUrl,
                Role = AdminProfile.role.ToString()
            };
        }
    }
}