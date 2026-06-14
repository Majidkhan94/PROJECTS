 import {SeperatorFeatures} from "../Features/SeperatorFeatures.jsx"
import { CardComponent } from "../Components/CardComponent.jsx"

export const FeaturedProductsSection = () =>{
return(<>
    
    
    <section className = "w-full">
     <SeperatorFeatures LeftText="Feature Products" RightText="View Products" />
     <div className = "flex flex-wrap justify-center gap-5">
     <CardComponent />
     <CardComponent />
     <CardComponent />
     <CardComponent />
     <CardComponent />
     <CardComponent />
     <CardComponent />
     <CardComponent />
     </div>
    </section>
    
    
    
    </>)}