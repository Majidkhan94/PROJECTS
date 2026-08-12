using Backend.Models;
namespace Backend.Orders
{
    public interface IOrdersRepo
    {
        Task<List<OrderModel>> AddOrder(List<OrderModel> orderItems);
        Task<List<OrderModel>> GetAllOrders();
        Task<List<OrderModel>> GetOrdersByUser(int userId);
        Task<List<OrderModel>> GetOrdersByVendor(int vendorId);
        Task<OrderModel?> UpdateOrderStatus(int id, OrderStatus status);
    }
}