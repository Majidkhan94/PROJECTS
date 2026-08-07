import Advertizement1 from "../../src/Public/Advertizement1.jpg";
import Advertizement2 from "../../src/Public/Advertizement2.png";
import Advertizement3 from "../../src/Public/Advertizement3.png";
import { Heading, Paragraph } from "../../Export.js";

export const AdvertizementSection = ()=>{

const AdvertizementData = [
        {"Image": Advertizement1, "Heading": "Elevate Your Sound", "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", "Button": {"Text": "All Products", "Link": "/products"}},
        {"Image": Advertizement2, "Heading": "Precision Engineered", "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", "Button": {"Text": "All Products", "Link": "/products"}},
        {"Image": Advertizement3, "Heading": "Studio Quality Audio", "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", "Button": {"Text": "All Products", "Link": "/products"}}
    ]

return(<>

     <section className="w-full h-auto flex items-center">
    
                <div className="w-full max-w-6xl mx-auto h-200 md:h-[80vh] flex flex-col md:flex-row gap-4 p-4">
    
                    <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${AdvertizementData[0].Image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className="absolute bottom-5 md:bottom-10 left-5 md:left-5 w-70 md:w-85">
                            <Heading text={AdvertizementData[0].Heading} className={"text-lg! md:text-2xl!"} />
                            <Paragraph text={AdvertizementData[0].Description} className={"text-[12px]! md:text-sm!"}/>
                        </div>
                    </div>
    
    
                    <div className="flex-1 flex flex-col gap-4 h-full">
                            <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${AdvertizementData[1].Image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                <div className="absolute bottom-5 md:bottom-10 left-5 md:left-5 w-70 md:w-85">
                                    <Heading text={AdvertizementData[1].Heading} className={"text-lg! md:text-2xl!"} />
                                    <Paragraph text={AdvertizementData[1].Description} className={"text-[12px]! md:text-sm!"}/>
                                </div>
                            </div>
                            <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${AdvertizementData[2].Image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                    <div className="absolute bottom-5 md:bottom-10 left-5 md:left-5 w-70 md:w-85">
                                    <Heading text={AdvertizementData[2].Heading} className={"text-lg! md:text-2xl!"} />
                                    <Paragraph text={AdvertizementData[2].Description} className={"text-[12px]! md:text-sm!"}/>
                                </div>
    
    
                            </div>
                    </div>
                </div>
    
            </section>

</>)}