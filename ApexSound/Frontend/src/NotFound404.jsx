import { Link } from "react-router-dom";
import { FaGhost } from "react-icons/fa6";
import { Heading, Paragraph } from "../Export.js";

export const NotFound404 = () => {
  return (
    <section className="h-screen flex items-center justify-center p-4 bg-black">
      <div className="text-center max-w-md">
        <FaGhost className="text-white text-7xl mx-auto mb-6 animate-bounce" />
        <Heading className={"text-9xl font-bold mb-2"} text={"404"}/>
        <Paragraph className={"text-2xl! font-semibold mb-10 uppercase"} text={"Page Not Found"} />        
        <Link to="/" className="inline-block bg-white text-black hover:bg-black hover:text-white border border-white font-semibold py-3 px-8 rounded-lg transition-all duration-200" > Back to Homepage </Link>
      </div>
    </section>
    
  )};