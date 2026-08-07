import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {ProductCard, Paragraph, Heading, PageHeader} from "../Export.js";


export const CategoryProducts = () => {
  const { slug } = useParams(); 

  const [fetchdata, setFetchdata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_PRODUCT_LIST}?product=${slug}`
        );
        setFetchdata(response.data.data);
      } catch (err) {
        console.log("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

if (!loading && fetchdata.length === 0)
{
    return <Paragraph text={"NO PRODUCT FOUND IN THIS CATEGORY"} className={"text-2xl! text-center p-10"}/>
}


  return (<>
    <PageHeader text={slug}/>    
    <section className="flex flex-wrap gap-6 justify-center p-6">
      {fetchdata.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  </>);
};