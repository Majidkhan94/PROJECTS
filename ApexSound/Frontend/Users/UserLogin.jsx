import { Input } from "../src/Feature/Input.jsx"
import {Button} from "../src/Feature/Button.jsx"
import { Heading } from "../src/Feature/Heading.jsx"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserLogin = () =>{

  const navigate = useNavigate();
    
    const [form, setForm] = useState({ Email: "", Password: ""})
    const[success, setSuccess] = useState(null);
    const[error, seterror] = useState(null);
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e)=>{
      e.preventDefault();
      seterror(null);
      setSuccess(null)
          try{
          setLoading(true);
          
          var response = await axios.post(`${import.meta.env.VITE_USER_LOGIN}`,
          form,
          {headers: {"Content-Type" : "application/json"}})

          setSuccess(response.data.message);
          localStorage.setItem("accessToken", response.data.data.accesstoken);
          localStorage.setItem("UserId", response.data.data.id);

          var timer = setTimeout(() => {
              navigate("/");}, 3000);
              return () => clearTimeout(timer);}
              
      catch(err){
        console.log("Full Error:", err.response?.data);
        if(err.response)
        {seterror(err.response.data.error || "LOGIN FAILED!")}
        else{seterror("Something went wrong. Please try again.")}}
      finally{setLoading(false)}
    }

    return(<>
    
    <section className="h-screen flex items-center justify-center p-4">
        <div className="shadow-2xl shadow-white p-8 rounded-md w-full max-w-md">
        <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
            <Heading text="LOGIN" className={"text-md"} />
        </span>

        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          
          <Input type="text" name="Email" placeholder="Email" value={form.Email}
          onChange={(e)=> setForm ({...form, Email: e.target.value})}/>
          
          <Input type="password" name="Password" placeholder="Password" value={form.Password}
          onChange={(e)=> setForm({...form, Password: e.target.value})} />
          
          <Button text= {"LOGIN"} type={"submit"} />
        </form>

    {/* Login Link */}
    <div className="text-center mt-4 text-sm text-hover-bg">
      Don't have an account?
      <Link to="/registeration" className="text-white ml-1 hover:underline">
        Register here
      </Link>
    </div>

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
  </div>
</section>
    
    </>)}