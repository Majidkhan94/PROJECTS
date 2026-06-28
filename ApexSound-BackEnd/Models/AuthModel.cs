using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApexSound_BackEnd.Models
{
    public class AuthModel
    {
        // Role
        public enum Role {admin, customer, vendor};

        // Model

        [Key]
        public int Id { get; set; }
        public string? fullname { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        
        [NotMapped]
        public string? confirmpassword { get; set; }
        public string? address { get; set; }
        public string? dob { get; set; }
        public string? gender { get; set; }
        public string? city { get; set; }
        public Role role { get; set; }
        public DateTime createdat {  get; set; } = DateTime.Now;
        public string? refreshtoken { get; set; }
        public DateTime? refreshtokenexpiry { get; set; }
        [NotMapped]
        public string? accesstoken { get; set; }


    }
}
