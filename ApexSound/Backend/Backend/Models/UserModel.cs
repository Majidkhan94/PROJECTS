using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class UserModel
    {
        // Role
        public enum Role { Admin, Vender, User };

        // Model
        [Key]
        public int Id { get; set; }
        public string? Fullname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        [NotMapped]
        public string? Confirmpassword { get; set; }
        public string? Age { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public Role? role { get; set; }
        public string? Refreshtoken { get; set; }

        [Column(TypeName = "timestamp")]
        public DateTime? Refreshtokenexpiry { get; set; }
        public DateTime? Createdat { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}
