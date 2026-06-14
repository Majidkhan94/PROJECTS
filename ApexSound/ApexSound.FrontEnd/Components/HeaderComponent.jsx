import logo  from "../public/logo.png";
import { NavlinkFeatures } from "../Features/NavlinkFeatures.jsx";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export const HeaderComponent = () => {

    const [isOpen, SetisOpen] = useState(false)

    return (<>





        <section className = "flex w-full justify-between px-5 md:justify-between md:px-30">
            
            { /*LOGO*/ }
                
                <div>
                    <Link to= "/"> <img src={logo} className= "w-20" /> </Link>
                </div>


            { /*PC_MENU*/ }

                <div className="hidden items-center justify-center gap-10 md:flex">
                    <div className= "flex gap-x-7">
                        <NavlinkFeatures text={"Home"} to = {"/"}/>
                        <NavlinkFeatures text={"About Us"} to = {"/aboutus"}/>
                        <NavlinkFeatures text={"Products"} to = {"/products"}/>
                        <NavlinkFeatures text={"Blog"} to = {"/blog"}/>
                        <NavlinkFeatures text={"Contact Us"} to = {"/contactus"}/>
                    </div>
                
            { /*LOGIN*/ }

                <div className="group relative flex items-center justify-center">
                    <Link to="/"> <FiLogIn className="size-4" /></Link>
                    <Link to="/" className="absolute -bottom-10 scale-0 rounded bg-button p-2 text-xs
                                            text-white transition-all duration-500 group-hover:scale-100">
                       Login
                    </Link>
                </div>
            </div>

             { /*MOBILE_MENU*/ }
             

             <div className= "relative flex items-center sm:hidden">
                <GiHamburgerMenu className="size-6 cursor-pointer" onClick={() => SetisOpen(!isOpen)} />

                
             <div className={`fixed inset-0 z-50 flex h-screen w-full flex-col bg-black text-white transition-all duration-1500 ease-in-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
    
            { /* Close Button (Icon) */ }
                <button onClick={() => SetisOpen(false)} className="absolute top-5 right-5 text-4xl">
                  X
                </button>

            { /* Menu Links */ }
                <div className="flex h-full flex-col items-center justify-center gap-10 text-3xl">
                  <NavlinkFeatures text={"Home"} to={"/"} onClick={() => SetisOpen(false)} />
                  <NavlinkFeatures text={"About Us"} to={"/aboutus"} onClick={() => SetisOpen(false)} />
                  <NavlinkFeatures text={"Products"} to={"/products"} onClick={() => SetisOpen(false)} />
                  <NavlinkFeatures text={"Blog"} to={"/blog"} onClick={() => SetisOpen(false)} />
                  <NavlinkFeatures text={"Contact Us"} to={"/contactus"} onClick={() => SetisOpen(false)} />
                  <Link to="/"> <FiLogIn className="mb-2 size-8" onClick={()=>SetisOpen(false)} /></Link>
                </div>
              </div>
        </div>

        </section>    
    </>);
}