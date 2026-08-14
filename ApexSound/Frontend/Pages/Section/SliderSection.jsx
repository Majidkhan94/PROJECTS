import { useState, useEffect } from "react"
import Slider1 from "../../src/Public/Slider1.jpg"
import Slider2 from "../../src/Public/Slider2.jpg"
import Slider3 from "../../src/Public/Slider3.jpg"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {Heading, Paragraph, Button} from "../../Export.js";


export const SliderSection = () => {

    const data = [
        {   "Image": Slider1, "heading": "Premium Headphones",
            "Description": "Immerse yourself in rich, studio-quality sound with active noise cancellation and all-day comfort.",
            "button1": { "text": "All Products", "link": "/products" }, "button2": { "text": "Explore Category", "link": "/categories/headphone" }
        },
        {   "Image": Slider2, "heading": "Powerful Speakers",
            "Description": "Fill any room with deep bass and crystal-clear highs, built for parties, home theaters.",
            "button1": { "text": "All Products", "link": "/products" }, "button2": { "text": "Explore Category", "link": "/categories/speaker" }
        },
        {
            "Image": Slider3, "heading": "Professional Microphones",
            "Description": "Capture crisp, broadcast-ready audio for podcasts, streaming, and studio recording.",
            "button1": { "text": "All Products", "link": "/products" }, "button2": { "text": "Explore Category", "link": "/categories/microphone" }
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
                <div className="absolute left-10 md:left-20 inset-0 z-20 flex flex-col justify-center px-4 w-80 md:w-120">
                    <div className={`flex flex-col  transition-all duration-1500 linear delay-200
                        ${ show ? "opacity-100 -translate-x-" : "opacity-0 -translate-x-150"}`}>
                        <Heading text={data[currentSlide].heading} className={"text-2xl! md:text-4xl!"} />
                        <Paragraph text={data[currentSlide].Description} className={"text-[12px]! md:text-lg!"} />
                        <span className="flex gap-3 mt-4 md:mt-8">
                            <Button text={data[currentSlide].button1.text} 
                                    to={data[currentSlide].button1.link} />

                            <Button text={data[currentSlide].button2.text} 
                                    to={data[currentSlide].button2.link} />        
                        </span>
                    </div>
                </div>



                {/* Arrows */}

                
                
                <button onClick={Prevslide} className="absolute top-1/2 left-2 -translate-y-1/2 z-30 bg-button-color hover:bg-button-hover rounded-full p-2 text-[12px] md:text-lg">
                    <FaArrowLeft />
                </button>
                <button onClick={Nextslide} className="absolute top-1/2 right-2 -translate-y-1/2 z-30 bg-button-color hover:bg-button-hover rounded-full p-2 text-[12px] md:text-lg">
                    <FaArrowRight />
                </button>
            </section>
        </>
    )
}