using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? Createdat { get; set; }
        public string? ProductPicURL { get; set; }

        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }

        [ForeignKey("CategoryId")]
        public CategoryModel? Category { get; set; }

    }
}
