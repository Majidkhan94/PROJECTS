using System.ComponentModel.DataAnnotations;

namespace Backend.Contactus
{
    public class ContactusModel
    {
        [Key]
        public int Id { get; set; }
        public string? fullname { get; set; }
        public string? email { get; set; }
        public string? message { get; set; }
        
    }
}
