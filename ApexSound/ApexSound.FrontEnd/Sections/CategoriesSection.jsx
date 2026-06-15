import { SeperatorFeatures } from "../Features/SeperatorFeatures.jsx";
import Slider1 from "../public/Slider1.jpg";
import {Link} from "react-router-dom";

const CategoriesData = [
    
    { Image: Slider1, Heading: "Ease The Noise", Link: "#" },
    { Image: Slider1, Heading: "Ease The Noise", Link: "#" },
    { Image: Slider1, Heading: "Ease The Noise", Link: "#" },
    { Image: Slider1, Heading: "Ease The Noise", Link: "#" },
]

export const CategoriesSection = ()=>{

    return(<>
        
        <section>
        <SeperatorFeatures LeftText="Shop Popular Categories" RightText="View Categories" to="#" />
        
        <div className="mx-5 md:mx-20">
        <div className="flex flex-wrap gap-2">
            {CategoriesData.map((item,index)=>{
            return(<>
                <Link key={index} to={Link} className="relative w-44 transform transition-all duration-1000 hover:scale-105 md:w-146">
                        <div className="h-60 overflow-hidden rounded-2xl md:h-100">
                            <img src={item.Image} className="h-full w-full object-cover" />
                        </div>
                        
                        <div className="absolute bottom-10 flex w-full items-center justify-center text-white">
                            <h1>{item.Heading}</h1>
                        </div>
                </Link>
                </>)})}
        
        </div></div>
        </section>
        </>)}