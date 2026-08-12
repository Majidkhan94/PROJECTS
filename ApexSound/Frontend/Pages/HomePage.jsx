import { Heading, Paragraph, Button, Seperator, SliderSection, FeatureProductsSection, CategoriesSection, AdvertizementSection,
    WhychooseuSection, LatestproductSection, CustomerreviewSection, Pagetitle
 } from "../Export.js";

export const HomePage = () => {

    return (<>
    
            {/* Page Title */}
            <Pagetitle title={"HomePage"}/>

            <section className="mb-10">    
                {/* Slider  */}
                <SliderSection />
            
                {/* Feature Product  */}
                <Seperator Lefttext={"feature product"} Righttext={"all products"} to={"/products"}/>
                <FeatureProductsSection />
                <AdvertizementSection />        
       

            {/* Categories  */}
            <Seperator Lefttext={"Categories"} Righttext={"all categories"} to={"/categories"}/>
            <CategoriesSection />

            {/* Why Choose Us  */}
            <Seperator Lefttext={"why choose us"}/>
            <WhychooseuSection />

            {/* Latest Product  */}
            <Seperator Lefttext={"latest product"} Righttext={"all product"} to={"/products"}/>
            <LatestproductSection />  

            {/* Customer Review  */}
            <Seperator Lefttext={"customer review"}/>
            <CustomerreviewSection />           
            
            </section>
    </>);
};