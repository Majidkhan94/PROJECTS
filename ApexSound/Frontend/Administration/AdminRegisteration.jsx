import { FaUserLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';

import {Heading, Input, Button} from "../Export.js";

export const AdminRegisteration = () => {
    
    const navigate =  useNavigate();

    const [data, setdata] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

 // Form Data 
    const [formData, setFormData] = useState({ Fullname: "", Email: "", Password: "", Confirmpassword: "" });  

  const valueinput = (e) => { setFormData({...formData, [e.target.name]: e.target.value})};

    // Submit Form Data to Backend
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
      setLoading(true)

      if (!formData.Fullname || !formData.Email || !formData.Password || !formData.Confirmpassword) {
      setError("All field is required");
      return;
    }

    if(!formData.Email.includes("@")){
      setError("Please enter a valid email address");
      return;
    }

    if(formData.Password !== formData.Confirmpassword){
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try{
      const response = await axios.post(`${import.meta.env.VITE_ADMIN_REGISTERATION}`, formData,
         {headers: {"Content-Type" : "application/json"}});
      setSuccess("Registration successful!");
      localStorage.setItem("accessToken", response.data.details.accesstoken);
      localStorage.setItem("adminId", response.data.details.id);
      localStorage.setItem("role", response.data.details.role);
      navigate("/admin/dashboard");
    }
    catch(err){
      setError(err.response?.data?.message || "Registration failed.");
    }
    finally{
      setLoading(false);
    }
    };





    return (<>

<section className="h-screen flex items-center justify-center p-4">
  <div className="shadow-2xl shadow-white p-4 rounded-md w-full max-w-md">
    <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
      <FaUserLock />
      <Heading text="Admin Registration" />
    </span>

    <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
      <Input type="text" name="Fullname" placeholder="Full Name" value={formData.Fullname} onChange={valueinput} />
      <Input type="text" name="Email" placeholder="Email" value={formData.Email} onChange={valueinput} />
      <Input type="password" name="Password" placeholder="Password" value={formData.Password} onChange={valueinput} />
      <Input type="password" name="Confirmpassword" placeholder="Confirm Password" value={formData.Confirmpassword} onChange={valueinput} />
      <Button text= {loading ? "Registering..." : "Register" } type={"submit"} />
    </form>

    {/* Login Link */}
    <div className="text-center mt-4 text-sm text-hover-bg">
      Already have an account? 
      <Link to="/admin/login" className="text-white ml-1 hover:underline">
        Login here
      </Link>
    </div>

   {/* Error Message */}
{error && (
  <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
    {error}
  </div>
)}

{/* Success Message */}
{success && (
  <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
    {success}
  </div>
)}
  </div>
</section>


    </>)}