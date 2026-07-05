import { NavLink } from 'react-router-dom';

export const Navbar = ({ text, to, onClick, icon }) => {
  return (
    <NavLink 
      to={to}
      onClick={onClick} 
      icon={icon}
      className={({ isActive }) => 
        `inline-block transition-all duration-300 font-main text-sm tracking-tight
        ${isActive 
          ? "text-hover-bg" 
          : "text-white hover:text-hover-bg hover:-translate-y-1"
        }`
      }
    > 
      {text}
    </NavLink>
  );
};