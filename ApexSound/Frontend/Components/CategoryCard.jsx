import { Link } from "react-router-dom";
import { Button, Paragraph, Heading } from "../Export.js";

export const CategoryCard = ({ category }) => {

  const { name, profilePicURL, slug } = category;

  return (
    <Link to={`/categories/${slug}`}>
      <div className="w-95 md:w-72 bg-background-color rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105">

        {/* Image */}
        <div className="relative w-full overflow-hidden">
          <img src={profilePicURL} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="px-4 pt-4 pb-4">
          <span className="flex items-start justify-between gap-2 mt-2">
            <Heading text={name} className={"text-[16px]! font-semibold"} />
          </span>
          <Button text={"Explore Category"} className={"mt-4 w-full text-sm! font-medium"} />
        </div>
      </div>
    </Link>
  );
};  