import Slider1 from "../public/Slider1.jpg"

export const CardComponent = () => {

    const CardData = [
        {
            Image: Slider1,
            Price:"$100",
            Title: "Premium Audio",
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        }
    ]

return(<>
    
   <section>
   <div>
   {CardData.map((item,index)=>{
        return(<>

            <div key={index} className="flex w-90 flex-col rounded-md bg-black/3 md:w-70">
                <span className="flex w-full flex-1">
                    <img src = {item.Image} />
                </span>
                
                <span className = "px-5 py-5">
                    <p className="text-sm font-bold text-green-700">{item.Price}</p>
                    <h1 className = "text-md">{item.Title}</h1>
                    <p className="text-sm">{item.Description}</p>
                </span>
            </div>

            </>)
   
   })}
   
   </div>
   </section>
    
    
    
    </>)}