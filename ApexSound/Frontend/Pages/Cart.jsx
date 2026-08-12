import { useCart } from "../Components/CartContext.jsx";
import { Paragraph, PageHeader, Heading, Button, Pagetitle } from "../Export.js";

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (<>
      <Pagetitle title={"Cart"} />
      <PageHeader text={"Your Cart"} />
      <section className="flex flex-col gap-4 p-6 max-w-3xl mx-auto">

        {cartItems.length > 0
        ? (<>
          {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-background-color rounded-2xl p-4">
                  {/* Image */}
                  <img src={item.productPicURL} alt={item.name} className="w-24 h-24 object-cover rounded-xl shrink-0" />

                  {/* Details */}
                  <div className="flex-1">
                    <Heading text={item.name} className={"text-[14px]! md:text-[16px]! font-semibold"} />
                    <Paragraph text={`$${item.price}`} className={"text-button-greenhover font-bold text-[12px]! md:text-[14px]!"} />

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <Button text={"-"} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-full"/>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button text={"+"} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-full"/>
                    </div>
                  </div>

                  {/* Item total + remove */}
                  <div className="flex flex-col items-end gap-2">
                    <Paragraph text={`$${(item.price * item.quantity).toFixed(2)}`} className={"font-bold"}/>
                    <Button onClick={() => removeFromCart(item.id)} text={"Remove"} className={"hover:bg-button-redhover w-14 h-8 text-[10px]! md:w-20 md:h-10 md:text-[12px]!"}/>
                    
                  </div>
                </div>
              ))}

              {/* Total + Checkout — sirf ek baar, list ke baad */}
              <div className="flex justify-between items-center bg-background-color rounded-2xl p-5 mt-2">
                <Heading text={`Total: $${totalPrice.toFixed(2)}`} className={"text-[18px]! font-bold"} />
                <Button text={"Place Order"} className={"px-8 text-sm font-medium "} />
              </div>
            </>)
          : (<PageHeader text={"Cart is empty"} />)}

      </section>
    </>
  );
};