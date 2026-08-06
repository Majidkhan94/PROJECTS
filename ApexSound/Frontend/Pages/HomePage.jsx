import { Heading, Paragraph, Button,Seperator, Slider, FeatureProducts } from "../Export.js";

export const HomePage = () => {

    const AdvertizementData = [
        {"Image":"Image-1", "Heading": "Heading-1", "Description":"Description-1", "Button":{"Text" : "All Product", "Link": "/products"}},
        {"Image":"Image-2", "Heading": "Heading-2", "Description":"Description-2", "Button":{"Text" : "All Product", "Link": "/products"}},
        {"Image":"Image-3", "Heading": "Heading-3", "Description":"Description-3", "Button":{"Text" : "All Product", "Link": "/products"}}
    ]



    return(<>
    <section>
        <Slider />
        <Seperator Lefttext={"FEATURE PRODUCT"} Righttext={"ALL PRODUCT"}/>
        <FeatureProducts />

        {/* Advertizement */}

        <div className="w-full h-70 md:h-screen flex">

            <div className="relative bg-amber-700 flex-1">
                <div className="absolute bottom-0 left-5 md:left-10 pb-3 md:pb-10">
                    <Heading text={"Heading"} className={"text-lg! md:text-4xl!"} />
                    <Paragraph text={"Description"} className={"mb-2 md:mb-5 text-[12px]! md:text-lg!"}/>
                    <span>
                    <Button to={"#"} text={"All Products"} />
                    </span>
                </div>
                
            </div>
            
            
            <div className="flex-1 flex flex-col">
                    <div className="relative bg-green-800 flex-1">
                        <div className="absolute bottom-0 left-5 md:left-10 pb-3 md:pb-10">
                            <Heading text={"Heading"} className={"text-lg! md:text-4xl!"} />
                            <Paragraph text={"Description"} className={"mb-2 md:mb-5 text-[12px]! md:text-lg!"}/>
                            <span>
                            <Button to={"#"} text={"All Products"} />
                            </span>
                        </div>
                    </div>
                    <div className="relative flex-1 bg-blue-900">

                            <div className="absolute bottom-0 left-5 md:left-10 pb-3 md:pb-10">
                            <Heading text={"Heading"} className={"text-lg! md:text-4xl!"} />
                            <Paragraph text={"Description"} className={"mb-2 md:mb-5 text-[12px]! md:text-lg!"}/>
                            <span>
                            <Button to={"#"} text={"All Products"} />
                            </span>
                        </div>


                    </div>
            </div>
        </div>





    </section>
        

    
    </>)}