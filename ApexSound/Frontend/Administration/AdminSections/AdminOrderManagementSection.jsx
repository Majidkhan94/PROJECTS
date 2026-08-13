import { useState, useEffect } from "react";
import { Searchbar, PageHeader, Paragraph, Button } from "../../Export.js";
import { GetAllOrders, UpdateOrderStatus, DeleteOrder } from "../../APIs/OrderAPIs.js";

export const AdminOrderManagementSection = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Listing All Orders
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await GetAllOrders();
      if (response.success) {
        setOrders(response?.data?.data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = (orders || []).filter((order) =>
    order.productName?.toLowerCase().includes(search.toLowerCase()) ||
    order.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  // Update Order Status
  const handleUpdateStatus = async (orderId, status) => {
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await UpdateOrderStatus(orderId, status);

      if (response.success) {
        setSuccess(response?.message || "Order status updated successfully.");
        fetchOrders();
      } else {
        setError(response?.message || "Failed to update order status.");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Order Handler
  const handleDeleteOrder = async (orderId) => {
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await DeleteOrder(orderId);

      if (response.success) {
        setSuccess(response?.message || "Order deleted successfully.");
        fetchOrders();
      } else {
        setError(response?.message || "Failed to delete order.");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to delete order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader text="All Orders Management" />
      <section className="mx-5 mt-5 pb-5">
        {/* Search Bar */}
        <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." />

        {/* Error Message */}
        {error && (
          <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
            {success}
          </div>
        )}

        {/* List of Orders */}
        <div className="mx-5 mt-5">
          {/* Order Cards */}
          <div className="flex flex-col md:flex-row flex-wrap gap-5 mt-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-background-color rounded-2xl p-6 w-full md:w-[calc(33.333%-1.34rem)] flex flex-col justify-between">
                
                <div>
                  {/* Image + Product Name header, underline below */}
                  <div className="pb-4 mb-5 border-b">
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={order.productPicURL}
                        alt={order.productName}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex flex-col items-center text-lg font-semibold">
                        <span>{order.productName}</span>
                        <span className="text-xs text-white/50">{`[ ${order.status} ]`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Fields */}
                  <div className="flex flex-col gap-2">
                    <Paragraph text={`Price: $${order.price}`} />
                    <Paragraph text={`Quantity: ${order.quantity}`} />
                    <Paragraph text={`Total Price: $${order.totalPrice}`} />
                  </div>

                  {/* Shipping Fields */}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    <Paragraph text={`Customer: ${order.fullName}`} />
                    <Paragraph text={`Phone: ${order.phone}`} />
                    <Paragraph text={`Address: ${order.address}`} />
                    <Paragraph text={`City: ${order.city}`} />
                  </div>
                </div>

                <div>
                  {/* Status Update */}
                  <div className="mt-6">
                    <select
                      className="w-full rounded-full px-3 py-2 bg-white/5 text-hover-bg outline-none"
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    >
                      <option value="Pending" className="text-black font-semibold">Pending</option>
                      <option value="Processing" className="text-black font-semibold">Processing</option>
                      <option value="Shipped" className="text-black font-semibold">Shipped</option>
                      <option value="Delivered" className="text-black font-semibold">Delivered</option>
                      <option value="Cancelled" className="text-black font-semibold">Cancelled</option>
                    </select>
                  </div>

                  {/* Delete Button */}
                  <div className="mt-3">
                    <Button
                      onClick={() => handleDeleteOrder(order.id)}
                      text={"Delete"}
                      className={"w-full hover:bg-red-600! hover:text-white! text-sm!"}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && !loading && (
            <p className="text-red-500 text-center mt-6">No orders found.</p>
          )}
        </div>
      </section>
    </>
  );
};