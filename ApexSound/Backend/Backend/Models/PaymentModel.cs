namespace Backend.Models
{
    public class PaymentModel
    {
        public List<PaymentItem> Items { get; set; } = new();
    }

    public class PaymentItem
    {
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}