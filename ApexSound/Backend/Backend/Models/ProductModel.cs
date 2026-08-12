using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend.Models
{
    public class ProductModel
    {
        // Products
        public enum Products { FeatureProducts, SimpleProducts }
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? Createdat { get; set; }
        public string? ProductPicURL { get; set; }
        public Products? products { get; set; }

        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        [ForeignKey("CategoryId")]
        public CategoryModel? Category { get; set; }

        // Vendor (jis ne product add kiya)
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public AuthModel? User { get; set; }
    }
}