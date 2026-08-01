import { Card } from "../../Components/Card.jsx";
import { useState, useEffect } from "react";
import axios from "axios";


export const FeatureProducts = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const Fetchdata = async () => {
            try {
                setLoading(true);
                const response = await axios.get(import.meta.env.VITE_PRODUCT_LIST);
                console.log("Feature Products Response:", response.data.data);
                setData(response.data.data);
            } 
            catch (error) { console.error("Error fetching feature products:", error);}
            finally {setLoading(false);}
        }
        Fetchdata();
    }, []);

    const featuredProducts = data
  .filter(p => p.products === "FeatureProducts")
  .sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
  .slice(0, 8);



  return (<>
  
<section className="flex flex-wrap gap-4 justify-center items-center my-8 md:my-8">
    {featuredProducts.map((product) => (
        <Card key={product.id} product={product} />
    ))}
</section>  
  
  
  </>);
};