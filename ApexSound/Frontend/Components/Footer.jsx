import logo from "../Public/Logo.png";
import {Paragraph} from "../Feature/Paragraph.jsx";
import { Navbar } from "../Feature/Navbar.jsx";


export const Footer = () => {
    return (<>
    
    <footer className="bg-black text-white py-16 px-10 border-t border-gray-800">
   
        <div className="flex flex-wrap gap-18 justify-between">
        
                                    {/* Widget-1*/}
        <div className="flex flex-col w-full md:w-[250px]">
            <img src={logo} alt="Logo" className="w-30" />
            <Paragraph text="ApexSound is your ultimate destination for premium audio equipment, 
            offering a wide range of products to elevate your sound experience." />
        </div>

                                 {/* Widget-2: Quick Links */}
        <div className="flex-1">
            <h3 className="font-bold text-lg mb-4 text-white">QUICK LINKS</h3>
            <nav className="flex flex-col gap-4 text-hover-bg">
                <Navbar to="/support" text="Support" />
                <Navbar to="/faq" text="FAQ" />
                <Navbar to="/terms" text="Terms" />
                <Navbar to="/privacy" text="Privacy" />
            </nav>
        </div>

        {/* 3rd Widget: Navigation */}
        <div className="flex-1">
            <h3 className="font-bold text-lg mb-4 text-white">NAVIGATION</h3>
            <nav className="flex flex-col gap-4 text-hover-bg">
                <Navbar to="/" text="Home" />
                <Navbar to="/products" text="Products" />
                <Navbar to="/about" text="About Us" />
                <Navbar to="/contact" text="Contact Us" />
            </nav>
        </div>

        {/* 4th Widget: Newsletter */}
        <div className="flex-1">
            <h3 className="font-bold text-lg mb-4 text-white">NEWSLETTER</h3>
            <p className="text-hover-bg text-sm mb-4">Subscribe to get latest updates.</p>
            <div className="flex flex-col gap-2">
                <input type="email" placeholder="Enter your email" 
                    className="bg-gray-900 border border-gray-700 p-2 rounded text-sm outline-none focus:border-hover-bg"
                />
                <button className="bg-hover-bg text-white py-2 rounded text-sm hover:bg-opacity-80 transition">
                    Subscribe
                </button>
            </div>
        </div>

    </div>
    
    {/* Copyright */}
    <div className="text-center text-gray-600 text-xs mt-12 pt-6 border-t border-gray-900 hover:text-white cursor-pointer">
        © 2026 ApexSound. All rights reserved.
    </div>
</footer>

    
    </>)}