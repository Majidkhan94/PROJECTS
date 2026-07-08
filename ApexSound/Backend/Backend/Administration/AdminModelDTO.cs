
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Administration
{
    public class AdminRegDTO
    {
        public int Id { get; set; }
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

        public string? Accesstoken { get; set; }
        public string? Refreshtoken { get; set; }
        public string? Role { get; set; }

    }
    public class AdminLogDTO
    {
        public int Id { get; set; }
        [Required]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 8, ErrorMessage = "Password must be between 8 to 15 characters")]
        public string? Password { get; set; }
        public string? Accesstoken { get; set; }
        public string? Refreshtoken { get; set; }
        public string? Role { get; set; }

    }

    public class AdminUpdateDTO
    {
        public string? Age { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public IFormFile? ProfilePictureUrl { get; set; }

    }

    public class AdminProfileDTO
    {
        public string? Fullname { get; set; }
        public string? Email { get; set; }
        public string? Age { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string? Role { get; set; }
    }















}

