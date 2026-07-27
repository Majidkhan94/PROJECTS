using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class CategoryModel
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public bool? IsActive { get; set; }
        public DateTime?  Createdat { get; set; }
        public string? ProfilePicURL { get; set; }

    }
}
