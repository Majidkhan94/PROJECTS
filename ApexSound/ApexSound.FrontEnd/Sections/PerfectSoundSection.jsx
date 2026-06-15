import { SeperatorFeatures } from "../Features/SeperatorFeatures.jsx";
import Slider1 from "../public/Slider1.jpg";

const Data =[
    {Image: Slider1 ,Title: "Sports & Fitness", Description: "Crush Your Workout with Beats that Move You" },
    {Image: Slider1 ,Title: "Sports & Fitness", Description: "Crush Your Workout with Beats that Move You" },
    {Image: Slider1 ,Title: "Sports & Fitness", Description: "Crush Your Workout with Beats that Move You" },
    {Image: Slider1 ,Title: "Sports & Fitness", Description: "Crush Your Workout with Beats that Move You" },
]

export const PerfectSoundSection = () =>{
    return(<>


        <section>
        <SeperatorFeatures LeftText= "Perfect Sound, Anytime, Anywhere" />

            <div className="mx-5 md:mx-20">
            <div className="flex h-auto w-full flex-col gap-2 md:h-120 md:flex-row">
            {Data.map((item, index)=>{
                return(<>
                    <div key={index} className="relative flex w-full transform overflow-hidden rounded-2xl transition-all duration-1000 hover:w-full md:w-1/4">
                        <img src={item.Image} className="h-full w-full object-cover"/>
                    

                    <div className="absolute bottom-10 left-10 text-white">

                    <h1 className="tex">{item.Title}</h1>
                    <p>{item.Description}</p>
                    </div></div>



                    </>)
            })}
            </div></div>


        </section>

        </>)}