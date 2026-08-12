import { FaGhost } from "react-icons/fa6";
import { Heading, Paragraph, Button, Pagetitle } from "../Export.js";

export const NotFound404 = () => {
  return (<>
  <Pagetitle title={"Not Found"}/>
    <section className="h-screen flex items-center justify-center p-4 bg-black">
      <div className="text-center max-w-md">
        <FaGhost className="text-7xl mx-auto mb-6 animate-bounce" />
        <Heading className={"text-9xl font-bold mb-2"} text={"404"}/>
        <Paragraph className={"text-2xl! font-semibold mb-10 uppercase"} text={"Page Not Found"} />
        <Button text={"Back to Homepage"} to={"/"}/>        
      </div>
    </section>
    
  </>)};