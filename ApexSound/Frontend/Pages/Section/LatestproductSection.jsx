import { useState, useEffect } from "react";
import { ProductCard, Loading, Paragraph, PageHeader } from "../../Export.js";
import { ProductsList } from "../../APIs/ProductAPIs.js";

export const LatestproductSection = () => {

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
                console.error("Error fetching latest products:", error);
                setData([]);
            }
            finally { setLoading(false); }
        };
        Fetchdata();
    }, []);

    const latestProducts = (data || [])
        .sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
        .slice(0, 8);

    if (loading) return <Loading />;

    return (
        <section className="flex flex-wrap gap-4 justify-center items-center my-8 md:my-8">
            {latestProducts.length > 0 
                ? (latestProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                )))
                : (<PageHeader text={"No latest products found."}/>)
            }
        </section>
    );
};