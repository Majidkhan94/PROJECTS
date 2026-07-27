using System.ComponentModel.DataAnnotations;

namespace Backend.Category
{
    public class CategoryModelDTO
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public IFormFile? ProfilePic { get; set; }
        public string? ProfilePicURL { get; set; }

    }
}
