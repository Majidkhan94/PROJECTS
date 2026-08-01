import { useState, useEffect } from "react"
import { Heading } from "../../Feature/Heading.jsx"
import { Paragraph } from "../../Feature/Paragraph.jsx"
import { Button } from "../../Feature/Button.jsx"
import Slider1 from "../../Public/Slider1.jpg"
import Slider2 from "../../Public/Slider2.jpg"
import Slider3 from "../../Public/Slider3.jpg"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export const Slider = () => {

    const data = [
        {   "Image": Slider1, "heading": "Premium Headphones",
            "Description": "Immerse yourself in rich, studio-quality sound with active noise cancellation and all-day comfort.",
            "button1": { "text": "Buy Now", "link": "#" }, "button2": { "text": "All Products", "link": "/products" }
        },
        {   "Image": Slider2, "heading": "Powerful Speakers",
            "Description": "Fill any room with deep bass and crystal-clear highs, built for parties, home theaters, and everyday listening.",
            "button1": { "text": "Buy Now", "link": "#" }, "button2": { "text": "All Products", "link": "/products" }
        },
        {
            "Image": Slider3, "heading": "Professional Microphones",
            "Description": "Capture crisp, broadcast-ready audio for podcasts, streaming, and studio recording sessions.",
            "button1": { "text": "Buy Now", "link": "#" }, "button2": { "text": "All Products", "link": "/products" }
        },
    ]

    const [currentSlide, setCurrentslide] = useState(0)
    
    const [show, setShow] = useState(false)

    const Index = (index) => { setCurrentslide(index) };

    const Nextslide = () => { Index(currentSlide === data.length - 1 ? 0 : currentSlide + 1) };

    const Prevslide = () => { Index(currentSlide === 0 ? data.length - 1 : currentSlide - 1) };

    useEffect(() => {
            setShow(false)
            const Timer = setTimeout(() => setShow(true), 1000);
            const Autoslide = setInterval(() => { Nextslide(); }, 5000);
            return () => {
                clearTimeout(Timer);
                clearInterval(Autoslide);
            }}, [currentSlide])

    return (
        <>
            <section className="relative w-full h-70 md:h-screen overflow-hidden">
                <div className="flex h-full transition-transform duration-2000 ease-in-out"
                     style={{ width: `${data.length * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / data.length)}%)`}}>
                    
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="relative h-full w-full">
                                <img src={item.Image} className="w-full h-full object-cover" />
                            </div>)})}
                </div>

                {/* Heading + Description + Buttons */}
                <div className="absolute left-10 md:left-20 inset-0 z-20 flex flex-col justify-center px-4 w-70 md:w-120">
                    <div className={`flex flex-col gap-2 md:gap-3 transition-all duration-1500 linear delay-200
                        ${ show ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-150"}`}>
                        <Heading text={data[currentSlide].heading} className={"text-lg! md:text-4xl!"} />
                        <Paragraph text={data[currentSlide].Description} className={"text-sm! md:text-lg!"} />
                        <span className="flex gap-3">
                            <Button text={data[currentSlide].button1.text} 
                                    to={data[currentSlide].button1.link} />

                            <Button text={data[currentSlide].button2.text} 
                                    to={data[currentSlide].button2.link} />        
                        </span>
                    </div>
                </div>



                {/* Arrows */}
                
                <button
                    onClick={Prevslide}
                    className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 text-sm sm:text-base transition"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={Nextslide}
                    className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 text-sm sm:text-base transition"
                >
                    <FaArrowRight />
                </button>
            </section>
        </>
    )
}