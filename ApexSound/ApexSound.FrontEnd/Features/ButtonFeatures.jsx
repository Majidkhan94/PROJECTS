import { Link } from "react-router-dom";

export const ButtonFeatures = ({text, to}) =>{
    
    return(<>
        

        <Link to={to} className = "rounded bg-button px-5 py-3 font-semibold text-[12px] text-white hover:bg-buttonhover">
        {text}
        </Link>
        
        
        
        </>)}