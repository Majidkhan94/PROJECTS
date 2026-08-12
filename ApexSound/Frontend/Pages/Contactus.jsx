import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { data, Link } from "react-router-dom";
import { useState } from "react";
import {ContactusAdd} from "../APIs/ContactusAPIs.js"
import {Heading, Paragraph, Input, Button, PageHeader, Pagetitle} from "../Export.js";


export const Contactus = () => {

    const [formData, setFormdata] = useState({ fullname: "", email: "", message: "" })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const HandleOnchange = (e) => {setFormdata({...formData, [e.target.name]: e.target.value})}
    
   const Handlesubmit = async (e) => {
        e.preventDefault();
        
        var accessToken = localStorage.getItem("accessToken")
        if(!accessToken){setError("Please login first to contact us"); return; }

        if(!formData.fullname || !formData.email || !formData.message){
          setError("Please fill all fields");
          setTimeout(() => setError(null), 1500);
          return;
        } 

        try{
            setLoading(true);
            var Add = await ContactusAdd(formData, {Authorization: `Bearer ${accessToken}`});
            if(Add.success){setSuccess(Add?.message);setTimeout(() => setSuccess(null), 1500);}
            else{setError(Add?.message);setTimeout(() => setError(null), 1500)}}
        catch(err){setError(err?.response?.data?.message || "Something Went Wrong"); setTimeout(() => setError(null), 1500)}
        finally{setLoading(false)}}

  return (<>    
        {/* Page title  */}
      <Pagetitle title={"Contactus"}/>
      <PageHeader text={"contacts us"}/>
      <section className="h-screen w-full flex flex-col md:flex-row">
            
            {/* LEFT: details panel */}
        <div className="flex-1 flex flex-col gap-3 justify-center p-6 md:p-20 overflow-hidden">
        <Paragraph text={"GET IN TOUCH"} className={"text-sm!"} />
        <Heading text={"Let's start a conversation."} className={"text-2xl! md:text-4xl! font-semibold!"}/>
        <Paragraph className={"text-md! mb-8"} text={"Have a project in mind, a question, or just want to say hello? Tear off your half and send it our way — we reply within one business day."} />
        
        <div className="flex gap-x-3 items-center">
              <FiMail className="w-4 h-4" />
              <span>Hello@apexsound.com</span>
        </div>

        <div className="flex gap-x-3 items-center">
              <FiPhone className="w-4 h-4" />
              <span>+92-341-1022489</span>
        </div>

        <div className="flex gap-x-3 items-center">
              <FiMapPin className="w-4 h-4" />
              <span>Misryal Chowk, Rawalpindi, Pakistan</span>
        </div>

          <div className="mt-4 flex items-center gap-5">

            <Link href = "#" className="w-9 h-9 rounded-full border hover:text-hover-color flex items-center justify-center">
            <FaInstagram />
            </Link>

            <Link href = "#" className="w-9 h-9 rounded-full border hover:text-hover-color flex items-center justify-center">
            <FaTwitter />
            </Link>

            <Link href = "#" className="w-9 h-9 rounded-full border hover:text-hover-color flex items-center justify-center">
            <FaLinkedin />
            </Link>
            
          </div>
        </div>

        {/* PERFORATED DIVIDER (ticket-stub signature) */}
        <div className="hidden md:flex flex-col items-center justify-between py-6 relative z-10 w-0">
          <div className="flex-1 border" />
        </div>

        {/* RIGHT: form panel */}
        <div className="flex-1 flex flex-col gap-3 justify-center p-6 md:p-20 overflow-hidden">
        <Paragraph text={"SEND A NOTE"} className={"text-sm!"} />
        <Heading text={"Tell us what's on your mind"} className={"text-2xl! md:text-4xl! font-semibold!"}/>

          <form className="flex flex-col gap-3" onSubmit={Handlesubmit}>
              
              <Input type={"text"} placeholder={"Full name"} name={"fullname"}
               value={formData.fullname} onChange={HandleOnchange}/>
              <Input type={"email"} placeholder={"Email address"} name={"email"} 
              value={formData.email} onChange={HandleOnchange}/>
              <textarea placeholder="Type your message here" rows={3} className="w-full bg-transparent border-0 border-b border-hover-bg" name="message" 
              value={formData.message} onChange={HandleOnchange}/>
              <Button type={"submit"} text={"Submit"} />
                
            {error &&   (<div className="text-red-500 text-sm">{error}</div>)}
            {success && (<div className="text-green-500 text-sm">{success}</div>)}    
            </form>
          </div>
      </section>
    </>);};