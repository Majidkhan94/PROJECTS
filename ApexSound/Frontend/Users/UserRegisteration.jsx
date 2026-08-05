import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Heading} from "../Export.js";


export const UserRegisteration = () =>{

  const navigate = useNavigate();
    
    const [form, setForm] = useState({ Fullname: "", Email: "", Password: "", Confirmpassword: ""})
    const[success, setSuccess] = useState(null);
    const[error, seterror] = useState(null);
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e)=>{
      e.preventDefault();
      seterror(null);
      setSuccess(null)
          try{
          setLoading(true);
          
          var response = await axios.post(`${import.meta.env.VITE_USER_REGISTERATION}`,
          form,
          {headers: {"Content-Type" : "application/json"}})

          setSuccess(response.data.message);
          localStorage.setItem("accessToken", response.data.data.accesstoken);
          localStorage.setItem("UserId", response.data.data.id);
          localStorage.setItem("Role", response.data.data.role);
          
          const timer = setTimeout(() => {
              navigate("/");}, 3000);
              return () => clearTimeout(timer);}

      catch(err){
        if(err.response)
        {seterror(err.response.data.error || "REGISTERATION FAILED!")}
        else{seterror("Something went wrong. Please try again.")}}
      finally{setLoading(false)}
    }

    return(<>
    
    <section className="h-screen flex items-center justify-center p-4">
        <div className="shadow-2xl shadow-white p-8 rounded-md w-full max-w-md">
        <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
            <Heading text="REGISTERATION" className={"text-md"} />
        </span>

        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          
          <Input type="text" name="Fullname" placeholder="Full Name" value={form.Fullname}
          onChange={(e)=> setForm({...form, Fullname: e.target.value})} />
          
          <Input type="text" name="Email" placeholder="Email" value={form.Email}
          onChange={(e)=> setForm ({...form, Email: e.target.value})}/>
          
          <Input type="password" name="Password" placeholder="Password" value={form.Password}
          onChange={(e)=> setForm({...form, Password: e.target.value})} />
          
          <Input type="password" name="Confirmpassword" placeholder="Confirm Password" value={form.Confirmpassword} 
          onChange={(e)=> setForm({...form, Confirmpassword: e.target.value})}/>
          
          <Button text= {"Submit"} type={"submit"} />
        </form>

    {/* Login Link */}
    <div className="text-center mt-4 text-sm text-hover-bg">
      Already have an account? 
      <Link to="/login" className="text-white ml-1 hover:underline">
        Login here
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