using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend.Models
{
    public enum OrderStatus { Pending, Processing, Shipped, Delivered, Cancelled }
    public class OrderModel
    {
        [Key]
        public int Id { get; set; }
        // All Item Grouped
        public Guid? OrderGroupId { get; set; }
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public AuthModel? User { get; set; }
        // Product
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductPicURL { get; set; }
        public decimal? Price { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        // Vendor
        public int? VendorId { get; set; }
        // Shipping Details
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public OrderStatus? Status { get; set; } = OrderStatus.Pending;
        public DateTime? CreatedAt { get; set; }

        // Payment
        public string? PaymentMethod { get; set; }
    }
}