using Backend.ConnectionStrings;
using Backend.Models;
using Backend.Users;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;
using Backend.Migrations;

namespace Backend.Users
{
    public class UserRepo : IUserRepo
    {
        private readonly ConnectionString _connectionString;
        private readonly Token _token;
        private readonly ICloudinary _Cloudinary;
        public UserRepo (ConnectionString connectionString, Token token, ICloudinary cloudinary)
        {
            _connectionString = connectionString;
            _token = token;
            _Cloudinary = cloudinary;
        }

        // USER REGISTERATION

        public async Task<UserRegDTO> userRegisteration(UserRegDTO userregDTO)
        {
            // All Fields Check 
            if 
                (string.IsNullOrEmpty(userregDTO.Fullname) ||
                string.IsNullOrEmpty(userregDTO.Email) ||
                string.IsNullOrEmpty(userregDTO.Password) ||
                string.IsNullOrEmpty(userregDTO.Confirmpassword))
            {
                throw new Exception("All Fields is Required");
            }

            // Email Check
            var UserExist = await _connectionString.UsersRegisteration.FirstOrDefaultAsync(r => r.Email == userregDTO.Email.Trim().ToLower());
            if (UserExist != null) throw new Exception("User Already Exists.");

            // Password Check
            if (userregDTO.Password != userregDTO.Confirmpassword) throw new Exception("Password Not Match");

            var User = new UserModel
            {
                Id = userregDTO.Id,
                Fullname = userregDTO.Fullname.Trim(),
                Email = userregDTO.Email.Trim().ToLower(),
                Password = BCrypt.Net.BCrypt.HashPassword(userregDTO.Password).Trim(),
                Confirmpassword = userregDTO.Confirmpassword,
                Refreshtoken = userregDTO.Refreshtoken,
                Refreshtokenexpiry = DateTime.UtcNow.AddDays(7),
                Createdat = DateTime.UtcNow,
                role = UserModel.Role.User
            };
                await _connectionString.UsersRegisteration.AddAsync(User);
                await _connectionString.SaveChangesAsync();

            // Tokens
            var accesstoken = Token.GenerateAccessToken(User.Id, User.Email, UserModel.Role.User.ToString());
            var refreshtoken = Token.GenerateRefreshToken();

            User.Refreshtoken = refreshtoken;
            await _connectionString.SaveChangesAsync();


            return new UserRegDTO
            {
                Id = User.Id,
                Fullname= User.Fullname,
                Email= User.Email,
                Password= User.Password,
                Accesstoken = accesstoken,
                Refreshtoken=refreshtoken,
            };
            
        }

        // USER LOGIN

        public async Task<UserLogDTO> userLogin(UserLogDTO userlogDTO)
        {
            // All Fields Check 
            if
                (string.IsNullOrEmpty(userlogDTO.Email) ||
                string.IsNullOrEmpty(userlogDTO.Password))
            {
                throw new Exception("All Fields is Required");
            }

            // Email Check
            var ExistEmail = await _connectionString.UsersRegisteration.FirstOrDefaultAsync(e => e.Email == userlogDTO.Email.Trim().ToLower());
            if (ExistEmail == null) throw new Exception("Invalid Email or Password");


            // Password Check 
            bool IspasswordCorrect = BCrypt.Net.BCrypt.Verify(userlogDTO.Password, ExistEmail.Password);
            if (!IspasswordCorrect) throw new Exception("Invalid Email or Password");

            // Token
            var accesstoken = Token.GenerateAccessToken(ExistEmail.Id, ExistEmail.Email, UserModel.Role.User.ToString());
            var refreshtoken = Token.GenerateRefreshToken();

            // Save Data
            ExistEmail.Refreshtoken = refreshtoken;
            await _connectionString.SaveChangesAsync();

            return new UserLogDTO
            {
                Id = ExistEmail.Id,
                Email = ExistEmail.Email.Trim().ToLower(),
                Password = ExistEmail.Password,
                Accesstoken = accesstoken,
                Refreshtoken = refreshtoken,
                
            };
        }

        // User Profile Update

        public async Task<UserProDTO> userProfile(int Id, UserProDTO userproDTO)
        {
            // Find User
            var UpdateUser = await _connectionString.UsersRegisteration.FindAsync(Id);
            if (UpdateUser == null) throw new Exception("User Not Found");

            // Profile Picture
            if (userproDTO.ProfilePicture != null)
            {
                var UploadImage = await _Cloudinary.UploadImage(userproDTO.ProfilePicture, "UserProfilePictures");
                UpdateUser.ProfilePictureUrl = UploadImage;
            }

            UpdateUser.Fullname = userproDTO.Fullname;
            UpdateUser.Age = userproDTO.Age;
            UpdateUser.PhoneNumber = userproDTO.PhoneNumber;
            UpdateUser.Address = userproDTO.Address;
            UpdateUser.City = userproDTO.City;
            UpdateUser.Gender = userproDTO.Gender;
            UpdateUser.DateOfBirth = userproDTO.DateOfBirth;

            await _connectionString.SaveChangesAsync();
            return new UserProDTO
            {
                Fullname = UpdateUser.Fullname,
                Email = UpdateUser.Email,
                Age = UpdateUser.Age,
                PhoneNumber = UpdateUser.PhoneNumber,
                Address = UpdateUser.Address,
                City = UpdateUser.City,
                Gender = UpdateUser.Gender,
                DateOfBirth = UpdateUser.DateOfBirth,
                ProfilePictureUrl = UpdateUser.ProfilePictureUrl
            };
        }

        // Get User Profile
        public async Task<UserProDTO> GetUserProfile(int Id)
        {
            var User = await _connectionString.UsersRegisteration.FindAsync(Id);
            if (User == null) throw new Exception("User Not Found");

            return new UserProDTO
            {
                Fullname = User.Fullname,
                Email = User.Email,
                Age = User.Age,
                PhoneNumber = User.PhoneNumber,
                Address = User.Address,
                City = User.City,
                Gender = User.Gender,
                DateOfBirth = User.DateOfBirth,
                ProfilePictureUrl = User.ProfilePictureUrl
            };
        }

        // User Delete
        public Task<bool> userDelete(int Id)
        {
            throw new NotImplementedException();
        }


        // Get User List
        public async Task<List<UserModel>> GetUserList()
        {
            return await _connectionString.UsersRegisteration.ToListAsync();
        }

        // Get User Count
        public async Task<int> GetUserCount()
        {
            return await _connectionString.UsersRegisteration.CountAsync();
        }
    }
}
