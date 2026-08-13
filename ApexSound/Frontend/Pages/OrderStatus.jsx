import { useEffect, useState } from "react";
import { Paragraph, PageHeader, Heading, Pagetitle } from "../Export.js";
import { GetOrdersByUser } from "../APIs/OrderAPIs.js";
import { FiClock, FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";

const statusConfig = {
  Pending: { icon: FiClock, color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Pending" },
  Processing: { icon: FiPackage, color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Processing" },
  Shipped: { icon: FiTruck, color: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "Shipped" },
  Delivered: { icon: FiCheckCircle, color: "bg-button-greenhover/10 text-button-greenhover border-button-greenhover/20", label: "Delivered" },
  Cancelled: { icon: FiXCircle, color: "bg-button-redhover/10 text-button-redhover border-button-redhover/20", label: "Cancelled" },
};

export const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("UserId");
      const response = await GetOrdersByUser(userId);
      if (response.success) {
        setOrders(response?.data?.data || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err?.response?.data?.message || "Something went wrong");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Pagetitle title={"My Orders"} />
      <section className="max-w-4xl mx-auto p-6">
        <PageHeader text={"My Orders"} />

        {error && (
          <div className="bg-background-color border border-red-500/20 p-4 rounded-2xl text-center mt-4 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5 mt-6">
          {orders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.Pending;
            const StatusIcon = config.icon;

            return (
              <div 
                key={order.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background-color border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all shadow-lg"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={order.productPicURL}
                    alt={order.productName}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shrink-0 border border-white/10"
                  />
                  <div className="flex flex-col gap-1">
                    <Heading text={order.productName} className="text-[15px]! md:text-[17px]! font-semibold text-white" />
                    <Paragraph text={`Qty: ${order.quantity} · $${order.totalPrice}`} className="text-white/60 text-[13px]! md:text-[14px]! font-medium" />
                    <span className="inline-block px-2.5 py-0.5 mt-1 text-[10px] md:text-[11px] font-medium bg-white/5 text-white/50 rounded-md w-fit border border-white/5">
                      {order.paymentMethod === "COD" ? "Cash on Delivery" : "Paid via Stripe"}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-white/5 gap-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${config.color}`}>
                    <StatusIcon size={15} />
                    <span>{config.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {orders.length === 0 && !loading && (<PageHeader text={"No orders yet."} className={"text-button-redhover"} />)}
      </section>
    </>
  );
};