using Backend.Models;

namespace Backend.Products
{
    public class ProductModelDTO
    {
        public enum Products { FeatureProducts, SimpleProducts }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? Createdat { get; set; }
        public IFormFile? ProductPic { get; set; }
        public string? ProductPicURL { get; set; }
        public Products products { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }

    }
}
