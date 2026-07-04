using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Backend.Services
{
    public class Token
    {
        public static string GenerateAccessToken(string email, string role)
        {
            var Key   = Environment.GetEnvironmentVariable("ACCESS_TOKEN");
            var Bytes = Encoding.ASCII.GetBytes(Key);

            var Claims = new[]
     {
        new Claim(ClaimTypes.Name, email),
        new Claim(ClaimTypes.Role, role)
    };

            var TokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Bytes), SecurityAlgorithms.HmacSha256Signature)
            };
            var Tokenhandler = new JwtSecurityTokenHandler();
            return Tokenhandler.WriteToken(Tokenhandler.CreateToken(TokenDescriptor));
        }

        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }












    }
}
