import logo  from "../public/logo.png";
import {Link} from "react-router-dom";
import { NavlinkFeatures } from "../Features/NavlinkFeatures.jsx";

export const FooterComponent = () => {
    return (<>
        
        <section className="flex flex-col items-center justify-center gap-8 bg-black/2 p-5 md:flex-row md:gap-0">
        
        <div className="flex flex-1 flex-col items-center justify-center text-center text-sm md:items-start md:text-left">
            <span>
                <Link to= "/"> <img src={logo} className= "w-30" /> </Link>
            </span>
            <span>
               <p>Lorem Ipsum is a standard placeholder text used in printing, typesetting, and digital design to simulate content without distracting from layout.</p>
            </span>
        
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-y-3 text-center text-sm font-normal">
        <h1 >Navigations</h1>
            <NavlinkFeatures text={"Home"} to = {"/"}/>
            <NavlinkFeatures text={"About Us"} to = {"/aboutus"}/>
            <NavlinkFeatures text={"Products"} to = {"/products"}/>
            <NavlinkFeatures text={"Blog"} to = {"/blog"}/>
        
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-y-3 text-center text-sm">
        <h1>Quicklinks</h1>
        <NavlinkFeatures text={"TermandCondition"} to = {"/termandcondition"}/>
        <NavlinkFeatures text={"PrivacyPolicy"} to = {"/privacypolicy"}/>
        <NavlinkFeatures text={"Faq"} to = {"/faq"}/>
        <NavlinkFeatures text={"Contact Us"} to = {"/contactus"}/>
        
        </div>
        
        <div className="flex flex-1 flex-col items-center justify-center gap-y-2">
        
            <h1>NewsLetter</h1>
            <input type="text" className="w-full rounded bg-black/10 py-2" />
            <Link className="w-full rounded bg-button py-3 text-center text-white hover:bg-buttonhover">Submit</Link>
        
        </div>
        
        </section>
        
        </>
    );
}