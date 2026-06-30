import { Heading } from "../../Feature/Heading.jsx";
import { IoIosUnlock } from "react-icons/io";
import {Input} from "../../Feature/Input.jsx"
import { Button } from "../../Feature/Button.jsx";
import { Link } from "react-router-dom";

export const AdminLogin = () => {
    return (<>


<section className="h-screen flex items-center justify-center p-4">
  <div className="shadow-2xl shadow-white p-8 rounded-md w-full max-w-md">
    
    <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
      <IoIosUnlock />
      <Heading text="Admin Login" />
    </span>

    <form className="flex flex-col gap-4">
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button text="Login" />
    </form>

    {/* Login Link */}
    <div className="text-center mt-4 text-sm text-hover-bg">
  Don't have an account? 
  <Link to="admin/register" className="text-white ml-1 hover:underline">
    Register here
  </Link>
</div>

    {/* Error Message */}
    <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
      Hardcoded error message here
    </div>
    <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
      Hardcoded error message here
    </div>
  </div>
</section>


    </>)}