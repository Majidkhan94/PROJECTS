import { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Button } from "../../../Feature/Button";


export const AdminOrderManagement = () => {
  const [search, setSearch] = useState("");

  const orders = [
    {
      name: "Order #1024",
      details: [
        { label: "Customer", value: "John Doe" },
        { label: "Total", value: "$84.98" },
        { label: "Status", value: "Pending" },
        { label: "Date", value: "05-07-2026" },
      ],
    },
    {
      name: "Order #1025",
      details: [
        { label: "Customer", value: "Ayesha Khan" },
        { label: "Total", value: "$34.99" },
        { label: "Status", value: "Delivered" },
        { label: "Date", value: "03-07-2026" },
      ],
    },
  ];

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-5 mt-5">
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 mb-8 w-full">
        <FaSearch className="text-white/50" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="bg-transparent outline-none text-white placeholder-white/40 w-full font-main"
        />
      </div>

      <div className="flex flex-wrap gap-8">
        {filteredOrders.map((order, index) => (
          <div key={index} className="border border-white/10 rounded-2xl p-6 text-white font-main w-[calc(50%-1rem)]">
            <div className="pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaShoppingCart size={20} />
                <span className="text-2xl font-semibold">{order.name}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {order.details.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/50 uppercase tracking-wide text-sm w-20">{item.label}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <Button text={"Update"} className={"bg-green-700 hover:bg-green-900! hover:text-white!"} />
              <Button text={"Cancel"} className={"bg-red-700 hover:bg-red-600! hover:text-white!"} />
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && <p className="text-white/50">No orders found.</p>}
      </div>
    </div>
  );
};