import { FaTruck, FaShieldAlt, FaCheckCircle, FaHeadset } from "react-icons/fa"
import {Heading, Paragraph} from "../../Export.js"
export const WhychooseuSection = () =>{

    const WhyChooseUs = [
    { icon: <FaTruck size={35}/>,        heading: "Fast Delivery",    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { icon: <FaShieldAlt size={35}/>,    heading: "Secure Payment",   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { icon: <FaCheckCircle size={35}/>,  heading: "Quality Products", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { icon: <FaHeadset size={35}/>,      heading: "Customer Support", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
]


    return(<>


    <section className="flex justify-between gap-4 mx-10">
        {WhyChooseUs.map((item, index) => (
            <div key={index} className="flex flex-col px-4 items-center text-center flex-1 p-4 rounded-lg bg-background-color hover:cursor-pointer transition-all duration-500 hover:scale-105">
            {item.icon}
            <Heading text={item.heading} className={"text-lg my-3"}/>
            <Paragraph text={item.description}/>
        </div>))}
    </section> 
    </>)}