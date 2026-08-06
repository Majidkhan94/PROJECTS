import { useState, useEffect} from "react";
import logo from "../src/Public/Logo.png";
import { Input, Button, Heading, Paragraph, Navbar } from "../Export.js";
import {NewsletterAdd} from "../APIs/NewsletterAPIs.js"



export const Footer = () => {

const [data, setData] = useState({ email: "" });
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(null);
const [error, setError] = useState(null);

const Newslettersubmit = async (e) => {
  
    e.preventDefault();
    if(data.email.trim() === "") {setError("Email Required"); setTimeout(() => setError(null), 1500); return;}

    try{
        setLoading(true);
        const Add = await NewsletterAdd(data);
        if(Add.success){
        setSuccess(Add.message)
        setTimeout(() => setSuccess(null), 1500);
    }
    else{setError(Add.message)}setTimeout(() => setError(null), 1500);}
    
    catch(err){setError(err?.message)}
    finally{setLoading(false)}
}
  const handleChange = (e) => {setData({ ...data, email: e.target.value });};

    return (<>
    
    <footer className="bg-background-color pt-10 pb-5 px-10">
      <div className="flex flex-wrap gap-18 justify-between">
        
        {/* Widget-1*/}
        <div className="flex flex-col items-center md:items-start w-full md:w-63">
            <img src={logo} alt="Logo" className="w-30" />
            <Paragraph text="ApexSound is your ultimate destination for premium audio equipment, offering a wide range of products to elevate your sound experience." />
        </div>

        {/* Widget-2: Quick Links */}
        <div className="flex-1">
            <Heading text={"QUICK LINKS"} className={"text-lg mb-3"} />
            <nav className="flex flex-col gap-4">
                <Navbar to="/support" text="Support" />
                <Navbar to="/faq" text="FAQ" />
                <Navbar to="/terms" text="Terms" />
                <Navbar to="/privacy" text="Privacy" />
            </nav>
        </div>

        {/* 3rd Widget: Navigation */}
        <div className="flex-1">
            <Heading text={"NAVIGATION"} className={"text-lg mb-3"} />
            <nav className="flex flex-col gap-4">
                <Navbar to="/" text="Home" />
                <Navbar to="/products" text="Products" />
                <Navbar to="/aboutus" text="About Us" />
                <Navbar to="/contact" text="Contact Us" />
            </nav>
        </div>

        {/* 4th Widget: Newsletter */}
        <div className="flex-1">
        <Heading text={"NEWSLETTER"} className={"text-lg"} />
        <Paragraph text={"Subscribe to get latest updates."} className={"text-sm py-2"} />
        <div className="flex flex-col gap-2">
        <form onSubmit={Newslettersubmit}>
          <Input type={"email"} placeholder={"Enter your email"} className={"text-sm"} 
            value={data.email} onChange={handleChange}/>
          <Button type={"submit"} text={"SUBMIT"} className={"bg-button-color w-full text-sm"} />
        </form>
        {success && <Paragraph text={success} className={"text-sm text-green-500!"} />}
        {error   && <Paragraph text={error}   className = {"text-sm text-red-500!"} />}
        </div>
</div>

    </div>
    
    {/* Copyright */}
    <div className="text-center text-xs mt-5 md:mt-12 border-t border-text-color py-5">
        © 2026 ApexSound. All rights reserved.
    </div>
</footer>

    </>)}