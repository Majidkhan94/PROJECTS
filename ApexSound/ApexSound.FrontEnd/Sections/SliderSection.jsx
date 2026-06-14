import Slider1 from "../public/Slider1.jpg";
import Slider2 from "../public/Slider2.jpg";
import Slider3 from "../public/Slider3.jpg";
import Slider4 from "../public/Slider4.jpg";
import { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import {ButtonFeatures} from "../Features/ButtonFeatures.jsx";


const SliderData = [
  { 
      Image: Slider1,
      Title: "Premium Audio", 
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", 
      Buy_Now:"#", 
      View_Products:"#"
  },
  { 
      Image: Slider2,
      Title: "Gaming Experience", 
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", 
      Buy_Now:"#", 
      View_Products:"#"
  },
  { 
      Image: Slider3,
      Title: "Immersive Sound", 
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", 
      Buy_Now:"#", 
      View_Products:"#"
  },
  { 
      Image: Slider4,
      Title: "Full Gear Set", 
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", 
      Buy_Now:"#", 
      View_Products:"#"
  },
  
];

    export const SliderSection = () => {


        const [isSlide, setisSlide] = useState(0)

        useEffect(()=>{
            const timer = setInterval(()=>{
                setisSlide((item)=>(item === SliderData.length - 1 ? 0 : item + 1))
            
            
            },300000)
            return ()=>{clearInterval(timer)}
        },[])



        return(<>
        
        <section className="relative h-80 w-full overflow-hidden md:h-screen">
            <div className="flex h-full w-full transition-transform duration-700 ease-out"
            style={{transform: `translateX(-${isSlide * 100}%)`}}>
                {SliderData.map((item,index)=>{
                        return(<>
                             <div key={index} className="relative h-full w-full shrink-0">
                             {/* Image */}
                                <img src={item.Image} className="h-full w-full object-cover" />
                                {/* Text */}
                                <div className={`absolute inset-0 flex w-75 flex-col justify-center gap-5 p-5 text-white md:w-140 md:p-20 transition-all duration-2000 linear ${isSlide === index ? "translate-y-0 opacity-100" : "translate-y-100 opacity-0"}`} >
                                    <h1 className="text-2xl md:text-4xl">{item.Title}</h1>
                                    <p className="text-sm text-white md:text-md">{item.Description}</p>
                                    <div className="flex gap-x-5">
                                    <ButtonFeatures to = {item.Buy_Now} text = "Buy Now" />
                                    <ButtonFeatures to = {item.View_Products} text = "View Products" />
                                    </div>
                                </div>
                                
                            </div>             
                        </>)})}</div>
        
                {/* Navigation Dots */}
                    <div className="absolute bottom-5 left-0 flex w-full justify-center gap-2 text-white">
                        {SliderData.map((_, index) => (
                          <div key={index} onClick={() => setisSlide(index)}>
                            <GoDotFill className={`cursor-pointer text-2xl transition-colors ${isSlide === index ? "text-[#0727c7]": "text-white"}`} />
                          </div>
                    ))}</div>
        
        
        
        
        
        
        
        </section></>)}