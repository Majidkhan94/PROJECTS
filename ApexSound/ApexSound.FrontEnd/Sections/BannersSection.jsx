import Banner1 from "../public/Banner1.png"
import Banner2 from "../public/Banner2.png"
import Banner3 from "../public/Banner3.png"
import {ButtonFeatures} from "../Features/ButtonFeatures.jsx"


    const Image = ({src}) =>{
        return(<>
                <img src={src} className="h-full w-full object-cover" />
              </>)}

    const Heading = ({text}) =>{
        return(<>
                <h1 className = "text-md md:text-3xl">{text}</h1>
              </>)}

     const Paragraph = ({text}) =>{
        return(<>
                <p className="pb-3 text-sm text-black md:text-md">{text}</p>
              </>)}


export const  BannersSection = () => {

    return(<>
        
        <section>
            <div className=" relative m-7 h-64 overflow-hidden rounded-2xl md:mx-20 md:h-100">
                  
                    <Image src={Banner1} />
                    <span className= "absolute bottom-5 left-5 md:bottom-15 md:left-15">
                        <Heading text="Ease The Noise" />
                        <Paragraph text="Sleep A30 Special"/>
                        <ButtonFeatures text = "Shop Now" />
                    </span>
                
            </div>
        
        <div className= "m-7 flex gap-x-4 md:mx-20">
        
        <div className="relative flex h-64 flex-1 overflow-hidden rounded-2xl md:h-100">
            <Image src={Banner2} />
                    <span className= "absolute bottom-5 left-5 md:bottom-15 md:left-15">
                        <Heading text="AeroClip" />
                        <Paragraph text="Open-Ring Design"/>
                        <ButtonFeatures text = "Shop Now" />
                    </span>
        </div>

        <div className="relative flex h-64 flex-1 overflow-hidden rounded-2xl md:h-100">
            <Image src={Banner3} />
                    <span className= "absolute bottom-5 left-5 md:bottom-15 md:left-15">
                        <Heading text="Soundcore" />
                        <Paragraph text="World's First Coin"/>
                        <ButtonFeatures text = "Shop Now" />
                    </span>
        </div>

        
        
        
        
        
        </div>
        
        
        
        
        </section>


        
        </>)}