import {Heading} from "../Feature/Heading.jsx"
import {Paragraph} from "../Feature/Paragraph.jsx"
import {Button} from "../Feature/Button.jsx"
import {Seperator} from "../Feature/Seperator.jsx"

import {Slider} from "../Pages/Section/Slider.jsx"
import {FeatureProducts} from "../Pages/Section/FeatureProducts.jsx"


export const HomePage = () => {
    return(<>
    <section>
        <Slider />
        <Seperator Lefttext={"FEATURE PRODUCT"} Righttext={"ALL PRODUCT"}/>
        <FeatureProducts />
    </section>
        

    
    </>)}