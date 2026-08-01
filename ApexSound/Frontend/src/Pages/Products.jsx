import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../Components/Card.jsx";
import { Paragraph } from "../Feature/Paragraph.jsx";
import {PageHeader} from "../Feature/PageHeader.jsx"

export const Products = () =>{

    const [fetchdata, setFetchdata] = useState([])
    const [loading, setLoading] = useState(false)

     useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_PRODUCT_LIST);
        setFetchdata(response.data.data);
        console.log("Fetch successfully", response.data.data);
      }
      catch (err) {console.log("Fetch failed", err);}
      finally {setLoading(false);}};
    fetchData();
  }, []);

if (!loading && fetchdata.length === 0)
{
    return <Paragraph text={"NO PRODUCT FOUND"} className={"text-2xl! text-center"}/>
}


   return (<>
   <PageHeader text={"products"}/>
   <section className="flex flex-wrap gap-6 justify-center p-6">
    {fetchdata.map((product) => (
      <Card key={product.id} product={product} />
    ))}
  </section>
   </>
  
)}