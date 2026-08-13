import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductCard, Paragraph, Heading, PageHeader, Pagetitle, Loading } from "../Export.js";
import { ProductsList } from "../APIs/ProductAPIs.js";

export const CategoryProducts = () => {
  const { slug } = useParams();

  const [fetchdata, setFetchdata] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const Fetchdata = async () => {
    try {
      setLoading(true);
      const response = await ProductsList(slug);
      setFetchdata(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching latest products:", error);
      setFetchdata([]);
    } finally {
      setLoading(false);
    }
  };
  Fetchdata();
}, [slug]);

if(loading) return <Loading />
  return (<>
    <Pagetitle title={`${slug}`}/>
    <PageHeader text={slug} />
      <section className="flex flex-wrap gap-4 justify-center items-center pb-10">
        {fetchdata.length > 0
        ? (fetchdata.map((product) => (<ProductCard key={product.id} product={product} />)))
        :(<PageHeader text={"Product not found.."}/>)
        }
        
      </section>
    </>
  );
};