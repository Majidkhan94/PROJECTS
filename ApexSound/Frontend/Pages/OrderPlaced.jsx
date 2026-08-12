import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext.jsx";
import { Paragraph, PageHeader, Heading, Button, Input, Pagetitle } from "../Export.js";
import { AddOrder } from "../APIs/OrderAPIs.js";

export const OrderPlaced = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrderPlaced = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.fullName || !form.phone || !form.address || !form.city) {
      setError("Please fill in all shipping details.");
      return;
    }

    try {
      setLoading(true);

      const userId = localStorage.getItem("UserId");

      const orderItems = cartItems.map((item) => ({
        userId: Number(userId),
        productId: item.id,
        productName: item.name,
        productPicURL: item.productPicURL,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        vendorId: item.userId,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim()
      }));

      const response = await AddOrder(orderItems);

      if (response.success) {
        setSuccess(response?.message || "Order placed successfully.");
        setTimeout(() => { clearCart(); }, 1500);
        setTimeout(() => { navigate("/"); }, 3000);
      } else {
        setError(response?.message || "Failed to place order.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Pagetitle title={"Order Placed"} />
      <PageHeader text={"Order Details"} />
      <section className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
        {cartItems.length > 0 ? (
          <>
            {/* Product Review (Disabled) */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 bg-background-color rounded-2xl p-6">
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={item.productPicURL}
                    alt={item.name}
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <div>
                    <Paragraph text="Product Name" className="text-xs text-white/50" />
                    <Heading text={item.name} className="text-[18px]! md:text-[20px]! font-semibold" />
                  </div>

                  <div>
                    <Paragraph text="Price" className="text-xs text-white/50" />
                    <Paragraph text={`$${item.price}`} className="text-button-greenhover font-bold text-[14px]! md:text-[16px]!" />
                  </div>

                  <div>
                    <Paragraph text="Quantity" className="text-xs text-white/50" />
                    <Paragraph text={item.quantity} className="font-semibold text-sm" />
                  </div>

                  <div>
                    <Paragraph text="Total Price" className="text-xs text-white/50" />
                    <Paragraph text={`$${(item.price * item.quantity).toFixed(2)}`} className="font-bold text-lg text-button-greenhover" />
                  </div>
                </div>
              </div>
            ))}

            {/* Shipping Form (User Fills) */}
           <form onSubmit={handleOrderPlaced} className="flex flex-col gap-4 bg-background-color rounded-2xl p-6">
              <PageHeader text={"Shipping Details"}/>

              <div className="flex flex-col md:flex-row gap-4">
                <Input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleInputChange} />
                <Input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleInputChange} />
                <Input type="text" name="city" placeholder="City" value={form.city} onChange={handleInputChange} />
              </div>

              <Input type="text" name="address" placeholder="Address" value={form.address} onChange={handleInputChange} />

              <div className="flex justify-between items-center mt-2">
                <Heading text={`Grand Total: $${totalPrice.toFixed(2)}`} className="text-[16px]! font-bold" />
              </div>

              {error && <p className="text-red-500 text-center text-sm">{error}</p>}
              {success && <p className="text-green-500 text-center text-sm">{success}</p>}

              <Button
                text={loading ? "Placing Order..." : "Place Order"}
                type="submit"
                className="w-full py-3 text-sm font-medium"
              />
            </form>
          </>
        ) : (
          <PageHeader text={"No items to order."} />
        )}
      </section>
    </>
  );
};