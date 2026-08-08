import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Button, Heading, Paragraph, PageHeader } from "../Export.js";
import {Login} from "../APIs/UserAPIS.js"


export const UserLogin = () =>{

  const navigate = useNavigate();
    
    const [form, setForm] = useState({ Email: "", Password: ""})
    const[success, setSuccess] = useState(null);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e)=>{
      e.preventDefault();
          try{
          setLoading(true);
          
          var login = await Login(form);
          if(login.success){
          setSuccess(login?.message);
          localStorage.setItem("accessToken", login?.data?.data?.accesstoken);
          localStorage.setItem("UserId", login?.data?.data?.id);
          localStorage.setItem("Role", login?.data?.data?.role);
          
          var timer = setTimeout(() => { navigate("/");}, 3000); return () => clearTimeout(timer);}
        
          else{ setError(login?.message);}}
          
                     
        catch(err){ setError(err?.response?.data)}
        finally{setLoading(false)}
    }

    return(<>
    
    <section className="h-screen flex items-center justify-center p-4">
        <div className="bg-background-color p-8 rounded-md w-full max-w-md">
          <PageHeader text={"login"}/>
        
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>

          <Input type="text" name="Email" placeholder="Email" value={form.Email}
          onChange={(e)=> setForm ({...form, Email: e.target.value})}/>
          
          <Input type="password" name="Password" placeholder="Password" value={form.Password}
          onChange={(e)=> setForm({...form, Password: e.target.value})} />
          
          <Button text= {"Submit"} type={"submit"} />
        </form>

    {/* Login Link */}
    <div className="flex justify-center gap-2 mt-4 text-sm">
      <Paragraph text={"Don't have an account? "}/> 
      <Link to="/registeration" className="font-semibold hover:underline"> Register here </Link>
    </div>
<div className="w-full text-center text-[12px] mt-4"><Link to={"/"}>Back to Homepage</Link></div>
{error   && (<div className="text-red-500 text-sm font-medium text-center pt-3">  {error}  </div>)}
{success && (<div className="text-green-500 text-sm font-medium text-center pt-3">{success}</div>)}
  </div>
</section>
    
    </>)}