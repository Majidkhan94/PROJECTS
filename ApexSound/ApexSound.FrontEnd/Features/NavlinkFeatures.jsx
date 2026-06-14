import { NavLink } from "react-router-dom";


export const NavlinkFeatures = ({ text, to, className,onClick}) => {
  return (
    <NavLink
        to={to}
        onClick={onClick}
       className={`font-para md:text-[13px] px-2 font-semibold transition-all duration-1000 
                    hover:text-button hover:-translate-y-2 hover:-translate-x-2 ${className}`}>
        {text}
    </NavLink>
  );};