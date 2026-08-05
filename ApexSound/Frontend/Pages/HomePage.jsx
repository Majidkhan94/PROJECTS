import { Heading, Paragraph, Button,Seperator, Slider, FeatureProducts } from "../Export.js";

export const HomePage = () => {
    return(<>
    <section>
        <Slider />
        <Seperator Lefttext={"FEATURE PRODUCT"} Righttext={"ALL PRODUCT"}/>
        <FeatureProducts />

        <Button text={"Example"}/>

    </section>
        

    
    </>)}