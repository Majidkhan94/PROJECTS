import { FaBox, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Button } from "../../src/Feature/Button.jsx";
import { useState } from "react";

export const ProductManagement = () => {
  const [search, setSearch] = useState("");

  const products = [
    {
      name: "Wireless Headphones",
      details: [
        { label: "Price", value: "$49.99" },
        { label: "Category", value: "Electronics" },
        { label: "Stock", value: "120 units" },
        { label: "Vendor", value: "Ali Electronics" },
      ],
    },
    {
      name: "Denim Jacket",
      details: [
        { label: "Price", value: "$34.99" },
        { label: "Category", value: "Clothing" },
        { label: "Stock", value: "45 units" },
        { label: "Vendor", value: "Sara's Boutique" },
      ],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-5 mt-5">
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 mb-8 w-full">
        <FaSearch className="text-white/50" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-transparent outline-none text-white placeholder-white/40 w-full font-main"
        />
      </div>

      <div className="flex flex-wrap gap-8">
        {filteredProducts.map((product, index) => (
          <div key={index} className="border border-white/10 rounded-2xl p-6 text-white font-main w-[calc(50%-1rem)]">
            <div className="pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaBox size={20} />
                <span className="text-2xl font-semibold">{product.name}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {product.details.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/50 uppercase tracking-wide text-sm w-20">{item.label}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <Button text={"Edit"} className={"bg-green-700 hover:bg-green-900! hover:text-white!"} />
              <Button text={"Delete"} className={"bg-red-700 hover:bg-red-600! hover:text-white!"} />
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && <p className="text-white/50">No products found.</p>}
      </div>
    </div>
  );
};
