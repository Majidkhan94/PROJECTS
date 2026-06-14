import {Link} from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export const SeperatorFeatures = ({LeftText,RightText}) =>{
return(<>
    
    <section>
        <div className = "flex justify-between px-5 py-10 md:px-15">
            <span> 
                <h1 className="text-[12px] md:text-2xl">{ LeftText }</h1>
            </span>
        
            <span className = "flex gap-1">
                <Link to="#"> <h1 className="text-[12px] md:text-sm">{ RightText }</h1> </Link>
                <FaArrowUpRightFromSquare className="size-3" />
            </span>
        </div>
    </section>
    </>)}