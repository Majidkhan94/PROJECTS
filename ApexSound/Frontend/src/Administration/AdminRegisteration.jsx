import { Heading } from "../../Feature/Heading.jsx";
import { FaUserLock } from "react-icons/fa6";
import {Input} from "../../Feature/Input.jsx"
import { Button } from "../../Feature/Button.jsx";
import { Link } from "react-router-dom";

export const AdminRegisteration = () => {
    return (<>


<section className="h-screen flex items-center justify-center p-4">
  <div className="shadow-2xl shadow-white p-8 rounded-md w-full max-w-md">
    
    <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
      <FaUserLock />
      <Heading text="Admin Registration" />
    </span>

    <form className="flex flex-col gap-4">
      <Input type="text" placeholder="Full Name" />
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm Password" />
      <Button text="Register" />
    </form>

    {/* Login Link */}
    <div className="text-center mt-4 text-sm text-hover-bg">
      Already have an account? 
      <Link to="admin/login" className="text-white ml-1 hover:underline">
        Login here
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