import {Link} from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export const SeperatorFeatures = ({LeftText,RightText}) =>{
return(<>
    
    <section>
        <div className = "flex items-center justify-between px-5 py-10 md:px-20">
            <span> 
                <p className="text-[20px] text-black md:text-[40px]">{ LeftText }</p>
            </span>
        
            <span className = "flex gap-1">
                <Link to="#"> <p className="text-[12px] md:text-sm">{ RightText }</p> </Link>
                <FaArrowUpRightFromSquare className="size-3" />
            </span>
        </div>
    </section>
    </>)}