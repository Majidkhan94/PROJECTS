using Backend.ConnectionStrings;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Backend.Orders
{
    public class OrdersRepo : IOrdersRepo
    {
        private readonly ConnectionString _connectionString;
        public OrdersRepo(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }

        // ADD ORDER (Cart ke sare items ek group mein)
        public async Task<List<OrderModel>> AddOrder(List<OrderModel> orderItems)
        {
            if (orderItems == null || orderItems.Count == 0)
            {
                throw new Exception("No items to order");
            }

            var groupId = Guid.NewGuid();

            foreach (var item in orderItems)
            {
                if (string.IsNullOrEmpty(item.FullName) ||
                    string.IsNullOrEmpty(item.Phone) ||
                    string.IsNullOrEmpty(item.Address) ||
                    string.IsNullOrEmpty(item.City))
                {
                    throw new Exception("Shipping Details are Required");
                }

                item.OrderGroupId = groupId;
                item.Status = OrderStatus.Pending;
                item.CreatedAt = DateTime.UtcNow;
            }

            await _connectionString.Orders.AddRangeAsync(orderItems);
            await _connectionString.SaveChangesAsync();

            return orderItems;
        }

        // GET ALL ORDERS (Admin)
        public async Task<List<OrderModel>> GetAllOrders()
        {
            return await _connectionString.Orders
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }

        // GET ORDERS BY USER (Customer apne orders dekhe)
        public async Task<List<OrderModel>> GetOrdersByUser(int userId)
        {
            return await _connectionString.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }

        // GET ORDERS BY VENDOR (Vendor apne product ke orders dekhe)
        public async Task<List<OrderModel>> GetOrdersByVendor(int vendorId)
        {
            return await _connectionString.Orders
                .Where(o => o.VendorId == vendorId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }

         // UPDATE ORDER STATUS (Admin/Vendor)
        public async Task<OrderModel?> UpdateOrderStatus(int id, OrderStatus status)
        {
            var order = await _connectionString.Orders.FindAsync(id);
            if (order == null) throw new Exception("Order Not Found");

            order.Status = status;
            await _connectionString.SaveChangesAsync();
            return order;
        }

        // Count
        public async Task<int> OrderCount()
        {
            return await _connectionString.Orders.CountAsync();
        }
    }
}