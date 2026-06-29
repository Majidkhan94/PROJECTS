
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Administration
{
    public class AdminModelDTO
    {
        [Required]
        public string? Fullname { get; set; }
        [Required]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 8, ErrorMessage = "Password must be between 8 to 15 characters")]
        public string? Password { get; set; }
        [NotMapped]
        [Compare("Password", ErrorMessage = "Password not match")]
        public string? Confirmpassword { get; set; }
        
    }
}

