import logo from "../src/Public/Logo.png";
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext.jsx";
import { Navbar } from "../Export.js";


export const Header = () => {

    const { totalItems } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

    const handleLinkClick = () => { setTimeout(() => { setIsOpen(false); }, 500); };

    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("Role");

    // Logout
    const logouthandle = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("UserId");
        localStorage.removeItem("Role");
        navigate("/login");
    };

    
    const dashboardLink =
        role === "Admin" ? { to: "/admin/dashboard", label: "Admin Dashboard" } :
        role === "Vender" ? { to: "/vendor/dashboard", label: "Vendor Dashboard" } :
        null;

    const profileLink = role === "Admin" ? "/admin/adminprofileupdate" : "/profile";

    return (
        <header className="bg-background-color flex justify-between items-center px-5 md:px-20 py-4">
            {/* Logo */}
            <Link to="/"> <img src={logo} alt="Logo" className="h-15 w-auto" /> </Link>

            {/* PC Version */}

            {/* Navigation Links */}
            <nav className="hidden md:flex gap-x-10 items-center">
                <Navbar to="/" text="Home" />
                <Navbar to="/products" text="Products" />
                <Navbar to="/categories" text="Categories" />
                <Navbar to="/aboutus" text="About Us" />
                <Navbar to="/contact" text="Contact Us" />

                {/* Direct Icons */}
                <div className="flex gap-x-5 ml-4 items-center">
                    {token && (
                        <Link to="/cart" className="relative hover:text-hover-color hover:-translate-y-1 transition-all duration-300">
                            <FiShoppingCart size={16} />
                            <span className="absolute -top-2 -right-2 bg-button-redhover text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        </Link>
                    )}

                    {/* User Icon / Account + Hover Dropdown */}
                    <div className="relative group">
                        <div className="cursor-pointer flex items-center gap-2 hover:text-hover-color hover:-translate-y-1 transition-all duration-300">
                            {token 
                            ? (<>
                              <span className="text-sm font-medium">Account</span>
                              <FiChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                            </>)
                            :(<FiUser size={18} />)}
                        </div>

                        {/* Dropdown */}
                        <div className="absolute right-0 top-full pt-3 hidden group-hover:block z-50">
                            <div className="bg-background-color rounded-md py-2 w-44 flex flex-col">
                                {!token && (
                                    <Link to="/login" className="px-4 py-2 text-sm hover:text-hover-color">
                                        Login
                                    </Link>
                                )}

                                {token && (<>
                                        {dashboardLink && (
                                        <Link to={dashboardLink.to} className="px-4 py-2 text-sm">
                                        {dashboardLink.label}
                                        </Link>
                                        )}
                                        <Link to={profileLink} className="px-4 py-2 text-sm">
                                            Profile
                                        </Link>
                                        <button onClick={logouthandle}
                                            className="text-left px-4 py-2 text-sm">
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
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

                <Navbar to="/" text="Home" onClick={handleLinkClick} />
                <Navbar to="/products" text="Products" onClick={handleLinkClick} />
                <Navbar to="/categories" text="Categories" onClick={handleLinkClick} />
                <Navbar to="/aboutus" text="About Us" onClick={handleLinkClick} />
                <Navbar to="/contact" text="Contact Us" onClick={handleLinkClick} />

                <div className="flex flex-col items-center gap-y-4 mt-4">
                    {token && (
                        <Link onClick={handleLinkClick} to="/cart" className="relative hover:text-hover-color hover:-translate-y-1 transition-all duration-300">
                            <FiShoppingCart size={16} />
                            <span className="absolute -top-2 -right-2 bg-button-redhover text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        </Link>
                    )}

                    {!token ? (
                        <Link onClick={handleLinkClick} to="/login" className="flex items-center gap-2 hover:text-hover-color transition-all hover:-translate-y-1 duration-300">
                            <FiUser size={18} /> Login
                        </Link>
                    ) : (
                        <div className="flex flex-col items-center gap-y-3">
                            <button onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                                className="flex items-center gap-2 cursor-pointer hover:text-hover-color hover:-translate-y-1 transition-all duration-300">
                                {/* <ImProfile size={18} />  */}
                                <span className="text-sm font-medium">Account</span>
                                <FiChevronDown className={`transition-transform ${mobileProfileOpen ? "rotate-180" : ""}`} />
                            </button>

                            {mobileProfileOpen && (
                                <div className="flex flex-col items-center gap-y-3 text-sm">
                                    {dashboardLink && (
                                        <Link onClick={handleLinkClick} to={dashboardLink.to} className="hover:text-hover-color transition-all duration-300">
                                            {dashboardLink.label}
                                        </Link>
                                    )}
                                    <Link onClick={handleLinkClick} to={profileLink} className="hover:text-hover-color transition-all duration-300">
                                        Profile
                                    </Link>
                                    <button onClick={() => { logouthandle(); handleLinkClick(); }}
                                        className="cursor-pointer hover:text-hover-color transition-all duration-300">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

        </header>
    );
};