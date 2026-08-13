using Backend.Controller;
using Backend.Migrations;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Orders
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : BaseController
    {
        private readonly IOrdersRepo _ordersRepo;
        public OrdersController(IOrdersRepo ordersRepo)
        {
            _ordersRepo = ordersRepo;
        }

        // ADD ORDER
        [HttpPost("add")]
        public async Task<IActionResult> AddOrder([FromBody] List<OrderModel> orderItems)
        {
            return await TryCatch(async () =>
            {
                var order = await _ordersRepo.AddOrder(orderItems);
                return order;
            }, "Order Placed Successfully");
        }

        // GET ALL ORDERS (Admin)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllOrders()
        {
            return await TryCatch(async () =>
            {
                var list = await _ordersRepo.GetAllOrders();
                return list;
            }, "Orders Fetched Successfully");
        }

        // GET ORDERS BY USER (Customer)
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUser(int userId)
        {
            return await TryCatch(async () =>
            {
                var list = await _ordersRepo.GetOrdersByUser(userId);
                return list;
            }, "Orders Fetched Successfully");
        }

        // GET ORDERS BY VENDOR
        [HttpGet("vendor/{vendorId}")]
        public async Task<IActionResult> GetOrdersByVendor(int vendorId)
        {
            return await TryCatch(async () =>
            {
                var list = await _ordersRepo.GetOrdersByVendor(vendorId);
                return list;
            }, "Orders Fetched Successfully");
        }

        // UPDATE ORDER STATUS
        [HttpPut("status/{id}")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderStatus status)
        {
            return await TryCatch(async () =>
            {
                var order = await _ordersRepo.UpdateOrderStatus(id, status);
                return order;
            }, "Order Status Updated Successfully");
        }

        // DELETE ORDER (New Added)
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            return await TryCatch(async () =>
            {
                var result = await _ordersRepo.DeleteOrder(id);
                return result;
            }, "Order Deleted Successfully");
        }

        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> ContactCount()
        {
            return await TryCatch(async () => {
                var count = await _ordersRepo.OrderCount();
                return count;
            }, "");
        }
    }
}