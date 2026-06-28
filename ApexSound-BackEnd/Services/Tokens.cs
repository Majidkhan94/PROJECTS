using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace ApexSound_BackEnd.Services
{
    public class Tokens
    {
        private readonly IConfiguration _Confiq;
        
        public Tokens(IConfiguration configuration)
        {
            _Confiq = configuration;
        }

        // Access Token
        public string GenerateAccessToken(string email, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Confiq["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expireinminute = Convert.ToDouble(_Confiq["Jwt:AccessTokenExpiryMinutes"]);

            var token = new JwtSecurityToken(

                issuer: _Confiq["Jwt:Issuer"],
                audience: _Confiq["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireinminute),
                signingCredentials: creds

                );
            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public string GenerateRefreshToken()
        {
            var Bytes = new byte[64];
            using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(Bytes);
            return Convert.ToBase64String(Bytes);
        }

        public DateTime GetRefreshTokenExpiry()
        {
            var expiryDays = Convert.ToDouble(_Confiq["Jwt:RefreshTokenExpiryDays"]);
            return DateTime.UtcNow.AddDays(expiryDays);
        }



    }
}
