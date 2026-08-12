import { useState, useEffect } from "react";
import { ProductCard, Loading, Paragraph, PageHeader } from "../../Export.js";
import { ProductsList } from "../../APIs/ProductAPIs.js";

export const FeatureProductsSection = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const Fetchdata = async () => {
            try {
                setLoading(true);
                const response = await ProductsList();
                if (response.success) {
                    setData(response?.data?.data || []);
                } else {
                    setData([]);
                }
            } 
            catch (error) {
                console.error("Error fetching feature products:", error);
                setData([]);
            }
            finally { setLoading(false); }
        };
        Fetchdata();
    }, []);

    const featuredProducts = (data || [])
        .filter(p => p.products === "FeatureProducts")
        .sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
        .slice(0, 8);

        if(loading) return <Loading />
    return (<>
        <section className="flex flex-wrap gap-4 justify-center items-center my-8 md:my-8">
            {featuredProducts.length > 0 
            ? (featuredProducts.map((product) => ( <ProductCard key={product.id} product={product} /> )))
            : ( <PageHeader text={"No featured products found."} />)}
        </section>
    </>);
};