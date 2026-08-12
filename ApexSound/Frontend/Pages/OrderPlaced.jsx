import { useCart } from "../Components/CartContext.jsx";
import { Paragraph, PageHeader, Heading, Button, Pagetitle } from "../Export.js";

export const OrderPlaced = () => {
  const { cartItems, totalPrice } = useCart();

  const handleOrderPlaced = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Pagetitle title={"Order Placed"} />
      <PageHeader text={"Order Details"} />
      <section className="flex flex-col gap-4 p-6 max-w-3xl mx-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
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

                <div className="mt-4">
                  <Button 
                    text={"Order Placed"} 
                    onClick={handleOrderPlaced}
                    className="w-full py-3 text-sm font-medium" 
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <PageHeader text={"No items to order."} />
        )}
      </section>
    </>
  );
};