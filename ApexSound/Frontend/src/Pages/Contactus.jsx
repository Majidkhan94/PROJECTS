import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import {Heading} from "../Feature/Heading"
import {Paragraph} from "../Feature/Paragraph"
import {Input} from "../Feature/Input"
import {Button} from "../Feature/Button"
import { data, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {PageHeader} from "../Feature/PageHeader.jsx"

export const Contactus = () => {

    const [formData, setFormdata] = useState({ fullname: "", email: "", message: "" })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const HandleOnchange = (e) => {setFormdata({...formData, [e.target.name]: e.target.value})}
    
    const Handlesubmit = async (e) => {
        e.preventDefault();
        
        var accessToken = localStorage.getItem("accessToken")
        if(!accessToken)
        {
            setError("Please login first to contact us")
            return;
        }
    
        try{
            setLoading(true);
            setSuccess(null);
            setError(null);

            var response = await axios.post(`${import.meta.env.VITE_CONTACTUS_ADD}`, formData,
            { headers: {Authorization: `Bearer ${accessToken}`}})
            setSuccess(response?.data?.message)
        }
        catch(err){ setError(err?.response?.data?.message || "Something Went Wrong")}
        finally{setLoading(false)}
    }

  return (<>    
      
      <PageHeader text={"contacts us"}/>
      <section className="h-screen w-full flex">
            
            {/* LEFT: details panel */}
        <div className="flex-1 flex flex-col gap-5 justify-center p-20 overflow-hidden">

        <Paragraph text={"GET IN TOUCH"} className={"text-lg!"} />
        <Heading text={"Let's start a conversation."} className={"text-4xl! font-semibold!"}/>
        <Paragraph className={"text-md!"} text={"Have a project in mind, a question, or just want to say hello? Tear off your half and send it our way — we reply within one business day."} />
        
        <div className="flex space-x-3 items-center text-hover-bg hover:cursor-pointer hover:text-white">
              <FiMail className="w-4 h-4" />
              <span>Hello@apexsound.com</span>
        </div>

        <div className="flex space-x-3 items-center text-hover-bg hover:cursor-pointer hover:text-white">
              <FiPhone className="w-4 h-4" />
              <span>+92-341-1022489</span>
        </div>

        <div className="flex space-x-3 items-center text-hover-bg hover:cursor-pointer hover:text-white">
              <FiMapPin className="w-4 h-4" />
              <span>Misryal Chowk, Rawalpindi, Pakistan</span>
        </div>

          <div className="mt-4 flex items-center gap-5">

            <Link href = "#" className="w-9 h-9 rounded-full border border-hover-bg flex items-center justify-center text-hover-bg hover:bg-white hover:text-black">
            <FaInstagram />
            </Link>

            <Link href = "#" className="w-9 h-9 rounded-full border border-hover-bg flex items-center justify-center text-hover-bg hover:bg-white hover:text-black">
            <FaTwitter />
            </Link>

            <Link href = "#" className="w-9 h-9 rounded-full border border-hover-bg flex items-center justify-center text-hover-bg hover:bg-white hover:text-black">
            <FaLinkedin />
            </Link>
            
          </div>
        </div>

        {/* PERFORATED DIVIDER (ticket-stub signature) */}
        <div className="hidden md:flex flex-col items-center justify-between py-6 relative z-10 w-0">
          <div className="flex-1 border-l-2 border-hover-bg/5 -translate-x-1/2" />
        </div>

        {/* RIGHT: form panel */}
        <div className="flex-1 flex flex-col gap-5 justify-center p-20 overflow-hidden">
        <Paragraph text={"SEND A NOTE"} className={"text-lg!"} />
        <Heading text={"Tell us what's on your mind"} className={"text-4xl! font-semibold!"}/>

          <form className="flex flex-col gap-5" onSubmit={Handlesubmit}>
              
              <Input type={"text"} placeholder={"Full name"} name={"fullname"}
               value={formData.name} onChange={HandleOnchange}/>
              <Input type={"email"} placeholder={"Email address"} name={"email"} 
              value={formData.email} onChange={HandleOnchange}/>
              <textarea placeholder="Type your message here" rows={3} className="w-full bg-transparent border-0 border-b border-hover-bg" name="message" 
              value={formData.message} onChange={HandleOnchange}/>
              <Button type={"submit"} text={"Submit"} />
                
            {error && (
            <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
                {error}
            </div>
            )}

            {success && (
            <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
                {success}
            </div>
            )}    
              
            </form>
          </div>
      </section>
    </>);};
