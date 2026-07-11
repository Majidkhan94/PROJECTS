import { useEffect, useState } from "react";

export const AdminSlide = ({ className, children }) => {
      
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 50);
        return () => clearTimeout(timer);
    },[]);
    
    return(<>
        <div className={`${className} w-full h-full transition-transform duration-[1000ms] ease-out
        ${show ? "translate-y-0" : "translate-y-full"}`}>
      {children}
    </div>
    </>)}