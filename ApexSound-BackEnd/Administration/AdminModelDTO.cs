using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApexSound_BackEnd.Administration
{
    public class AdminRegisteration
    {
        [Required]
        public string? fullname { get; set; }
        [Required]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Please enter a valid email address.")]
        public string? email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must have between 11 to 15 Character")]
        public string? password { get; set; }
        [NotMapped]
        [Compare("password", ErrorMessage = "Password Not Match")]
        public string? confirmpassword { get; set; }
        public DateTime createdat { get; set; } = DateTime.Now;
    }
    public class AdminLogin
    {
        [Required]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Please enter a valid email address.")]
        public string? email { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must have between 11 to 15 Character")]
        public string? password { get; set; }

    }

    public class Adminprofileupdate
    {
        public string? address { get; set; }
        public string? dob { get; set; }
        public string? gender { get; set; }
        public string? city { get; set; }

    }
}
