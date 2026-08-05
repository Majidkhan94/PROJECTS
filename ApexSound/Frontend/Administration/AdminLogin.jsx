import { IoIosUnlock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import {Heading, Input, Button,} from "../Export.js";

export const AdminLogin = () => {

  const navigate =  useNavigate();

  const [data, setdata] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Form Data
    const [formData, setFormData] = useState({ Email: "", Password: "" });
    const FormDataInput = (e) => { setFormData({...formData, [e.target.name]: e.target.value})}
  
    // Submit Form Data to Backend
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
      setLoading(true);

      if (!formData.Email || !formData.Password) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if(!formData.Email.includes("@")){
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
          const response = await axios.post(`${import.meta.env.VITE_ADMIN_LOGIN}`, formData);
          setSuccess("Login successful!");
          localStorage.setItem("accessToken", response.data.details.accesstoken);
          localStorage.setItem("adminId", response.data.details.id);
          localStorage.setItem("role", response.data.details.role);
          setFormData({ Email: "", Password: "" });
          navigate("/admin/dashboard");
        }
      catch (err) {
        setError(err?.data?.message || "Invalid email or password");
      }
      finally {
        setLoading(false);
      }
    }

    return (<>


<section className="h-screen flex items-center justify-center p-4">
  <div className="shadow-2xl shadow-white p-8 rounded-md w-full max-w-md">
    <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
      <IoIosUnlock />
      <Heading text="Admin Login" />
    </span>

    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input type="text" placeholder="Email" name="Email" value={formData.Email} onChange={FormDataInput} />
      <Input type="password" placeholder="Password" name="Password" value={formData.Password} onChange={FormDataInput} />
      <Button text={loading ? "Logging..." : "Login"} type="submit" />
    </form>

    {/* Login Link */}
    <div className="text-center mt-4 text-sm text-hover-bg">
  Don't have an account? 
  <Link to="/admin/registeration" className="text-white ml-1 hover:underline">
    Register here
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