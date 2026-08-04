import logo from "../Public/Logo.png";
import { Link } from 'react-router-dom';
import { Navbar } from '../Feature/Navbar.jsx'; 
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "../Feature/Button.jsx";

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleLinkClick = () => { setTimeout(() => {setIsOpen(false);}, 500);};

    // Logout
    const navigate = useNavigate();
    var token = localStorage.getItem("accessToken");

    var logouthandle = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("UserId");
        localStorage.removeItem("Role");
        navigate("/login");
        }

    return (
        <header className="bg-background-color flex justify-between items-center px-5 md:px-20 py-4">
            {/* Logo */}
            <Link to="/"> <img src={logo} alt="Logo" className="h-20 w-auto" /> </Link>

                                  {/* PC Version */}
            
            {/* Navigation Links */}
            <nav className="hidden md:flex gap-x-10 items-center">
                <Navbar to="/" text="Home" />
                <Navbar to="/products" text="Products" />
                <Navbar to="/categories" text="Categories" />
                <Navbar to="/aboutus" text="About Us" />
                <Navbar to="/contact" text="Contact Us" />

                {/* Direct Icons */}
                <div className="flex gap-x-5 ml-4">
                <Link to="/cart" className="hover:text-hover-color hover:-translate-y-1 transition-all duration-300">
                <FiShoppingCart size={16} />
                </Link>
                
                {token 
                    ?(<>
                    <Link to="/profile" className="hover:text-hover-color hover:-translate-y-1 transition-all duration-300">
                    <ImProfile size={18} />
                    </Link>
                    <button onClick={logouthandle}
                      className="cursor-pointer inline-block transition-all duration-300 font-main 
                      text-sm tracking-tight hover:text-hover-color hover:-translate-y-1">
                        Logout
                        </button></>)
                    : (<Link to="/login" className="hover:text-hover-color transition-all hover:-translate-y-1 duration-300">
                        <FiUser size={18} />
                    </Link>)}
                    
                </div>
            </nav>

            {/* Mobile Version */}
            
            {/* Hamburger Icon (Mobile) */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-hover-color z-50">
                {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
            {/* Mobile Menu */}
            <nav className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-y-8 z-40 
                transition-all duration-1500 ease-in-out
                ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                
                <Navbar to="/" text="Home"  onClick={handleLinkClick} />
                <Navbar to="/products" text="Products"  onClick={handleLinkClick} />
                <Navbar to="/categories" text="Categories"  onClick={handleLinkClick} />
                <Navbar to="/about" text="About Us"  onClick={handleLinkClick} />
                <Navbar to="/contact" text="Contact Us"  onClick={handleLinkClick} />
                
                <div className="flex gap-x-8 mt-4">
                    <Link to="/cart" onClick={handleLinkClick}><FiShoppingCart size={24}/></Link>
                    {token 
                    ?(<>
                    <Link to="/profile"><ImProfile size={18} /></Link>
                    <button onClick={logouthandle}>Logout</button>
                    </>)
                    : (<Link to="/login"> <FiUser size={18} /> </Link>)}
                </div>
            </nav>


        </header>



        















    );
};