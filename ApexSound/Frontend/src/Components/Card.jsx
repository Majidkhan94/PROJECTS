import {Heading} from "../Feature/Heading.jsx"
import {Paragraph} from "../Feature/Paragraph.jsx"
import {Button} from "../Feature/Button.jsx"

export const Card = ({ product }) => {
if (!product) return null;

const {name,description,price,stock,productPicURL,categoryName,products,} = product;

return (<>
    <div className="w-80 md:w-72 bg-hover-bg rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
      {/* Image */}
      <div className="relative w-full overflow-hidden">
        <img src={productPicURL} className="w-full h-full object-cover" />
        <Paragraph text={products} className={"absolute top-3 left-3 bg-hover-bg text-black! text-[10px]! rounded-full uppercase px-2 py-1 font-medium"} />
        <Paragraph text={`${stock} in stock`} className={"absolute top-3 right-3 bg-hover-bg text-green-700! text-[10px]! rounded-full uppercase px-2 py-1 font-bold"} />
      </div>  
        
      <div className="px-4 pt-4 pb-4">
        <Paragraph text={categoryName} className={"text-black! uppercase text-[12px]! font-medium tracking-widest"}/>
       
        <span className="flex items-start justify-between gap-2">
          <Heading text={name} className={"text-[17px]! font-semibold text-black!"} />
          <Paragraph text={`$-${price}`} className={"text-[17px]! font-bold text-green-700!"} />
        </span>
        <Paragraph text={description} className={"text-[13px]! text-black/70!"}/>
        <Button text={stock > 0 ? "Add to cart" : "Out of stock"} className={"mt-4 w-full text-sm font-medium"} />
      </div>
    </div>
  </>);};