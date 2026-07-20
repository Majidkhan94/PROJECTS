using System.ComponentModel.DataAnnotations;

namespace Backend.Newsletter
{
    public class NewsletterModel
    {
        [Key]
        public int Id { get; set; }
        public string? email { get; set; }
    }
}
