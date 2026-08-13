import { useNavigate } from "react-router-dom";
import { Heading, Paragraph, Button } from "../Export.js";
import { useCart } from "../Components/CartContext.jsx";

export const ProductCard = ({ product }) => {
  const { name, description, price, stock, productPicURL, categoryName, products } = product;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) { navigate("/login"); return; }
    addToCart(product);
  };

  return (
    <>
      <div className="w-95 md:w-72 bg-background-color rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
        <div className="relative w-full overflow-hidden">
          <img src={productPicURL} className="w-full h-full object-cover" />
          <Paragraph text={products} className={"absolute top-3 left-3 text-[10px]! uppercase"} />
          <Paragraph text={`${stock} in stock`} className={"absolute top-3 right-3 bg-text-color text-button-greenhover p-2 rounded-full text-[10px]! uppercase font-bold"} />
        </div>

        <div className="px-4 pt-4 pb-4">
          <Paragraph text={categoryName} className={" uppercase text-[10px]! font-medium tracking-widest"} />
          <span className="flex items-start justify-between gap-2 mt-2">
            <Heading text={name} className={"text-[16px]! font-semibold"} />
            <Paragraph text={`$-${price}`} className={"text-[16px]! font-bold text-button-greenhover"} />
          </span>
          <Paragraph text={description} className={"text-[14px]!"} />
          <Button
            onClick={handleAddToCart}
            text={stock > 0 ? "Add to cart" : "Out of stock"}
            disabled={stock <= 0}
            className={"mt-4 w-full text-sm! font-medium"}
          />
        </div>
      </div>
    </>
  );
};