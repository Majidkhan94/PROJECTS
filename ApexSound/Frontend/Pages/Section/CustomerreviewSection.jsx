import { FaUserCircle } from "react-icons/fa"
import { Heading, Paragraph } from "../../Export.js"

export const CustomerreviewSection = () => {

    const CustomerReviews = [
        { icon: <FaUserCircle size={35} />, heading: "John Doe",     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { icon: <FaUserCircle size={35} />, heading: "Sarah Khan",   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { icon: <FaUserCircle size={35} />, heading: "Ali Raza",     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { icon: <FaUserCircle size={35} />, heading: "Emily Smith",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { icon: <FaUserCircle size={35} />, heading: "Bilal Ahmed",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { icon: <FaUserCircle size={35} />, heading: "Ayesha Noor",  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    ]

    return (
        <section className="flex flex-col md:flex-row flex-wrap justify-between gap-4 mx-10">
            {CustomerReviews.map((item, index) => (
                <div key={index} className="flex flex-col px-10 items-center text-center flex-1 basis-[30%] p-4 rounded-lg bg-background-color hover:cursor-pointer transition-all duration-500 hover:scale-105">
                    {item.icon}
                    <Heading text={item.heading} className={"text-lg my-3"} />
                    <Paragraph text={item.description} />
                </div>
            ))}
        </section>
    )
}