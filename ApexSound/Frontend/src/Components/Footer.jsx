import logo from "../Public/Logo.png";
import {Paragraph} from "../Feature/Paragraph.jsx";
import { Navbar } from "../Feature/Navbar.jsx";
import {Heading} from "../Feature/Heading.jsx"
import {Input} from "../Feature/Input.jsx"
import {Button} from "../Feature/Button.jsx"
import { useState, useEffect} from "react";
import axios from "axios";

export const Footer = () => {

const [data, setData] = useState({ email: "" });
const [success, setSuccess] = useState(null);
const [errorMsg, setErrorMsg] = useState("");

const Newslettersubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_NEWSLETTER_ADD}`,data);
    setSuccess(true); setErrorMsg("");
    } 
    catch (err) {
    setSuccess(false); setErrorMsg(err.response?.data?.message || "Something went wrong.");
    }};

  const handleChange = (e) => 
    {setData({ ...data, email: e.target.value });};

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
            <Heading text={"QUICK LINKS"} className={"text-lg mb-3"} />
            <nav className="flex flex-col gap-4 text-hover-bg">
                <Navbar to="/support" text="Support" />
                <Navbar to="/faq" text="FAQ" />
                <Navbar to="/terms" text="Terms" />
                <Navbar to="/privacy" text="Privacy" />
            </nav>
        </div>

        {/* 3rd Widget: Navigation */}
        <div className="flex-1">
            <Heading text={"NAVIGATION"} className={"text-lg mb-3"} />
            <nav className="flex flex-col gap-4 text-hover-bg">
                <Navbar to="/" text="Home" />
                <Navbar to="/products" text="Products" />
                <Navbar to="/about" text="About Us" />
                <Navbar to="/contact" text="Contact Us" />
            </nav>
        </div>

        {/* 4th Widget: Newsletter */}
        <div className="flex-1">
        <Heading text={"NEWSLETTER"} className={"text-lg"} />
        <Paragraph text={"Subscribe to get latest updates."} className={"text-sm py-2 mb-3"} />
        <div className="flex flex-col gap-2">
        <form onSubmit={Newslettersubmit}>
          <Input type={"email"} placeholder={"Enter your email"} className={"text-sm"} value={data.email} onChange={handleChange}/>
          <Button type={"submit"} text={"SUBMIT"} className={"bg-hover-bg text-black! w-full text-sm"} />
        </form>
        {success === true && <Paragraph text={"SUBSCRIBED!"} className={"text-sm text-green-500!"} />}
        {success === false && <Paragraph className = {"text-sm text-red-500!"} text={errorMsg} />}
        </div>
</div>

    </div>
    
    {/* Copyright */}
    <div className="text-center text-gray-600 text-xs mt-5 md:mt-12 pt-6 border-t border-gray-900 hover:text-white cursor-pointer">
        © 2026 ApexSound. All rights reserved.
    </div>
</footer>

    
    </>)}