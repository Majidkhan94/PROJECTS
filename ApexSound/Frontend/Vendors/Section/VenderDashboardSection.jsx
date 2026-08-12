import { FiBox, FiShoppingCart, FiClipboard } from "react-icons/fi";
import { useState, useEffect } from "react";
import { CategoriesCount } from "../../APIs/CategoriesAPIs.js";
import { ProductsCount } from "../../APIs/ProductAPIs.js";
import { Loading, PageHeader } from "../../Export.js";

export const VenderDashboardSection = () => {
    const [loading, setloading] = useState(false);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const Dashboard = [
        { icon: <FiBox />, text: "Total Categories", numbers: category },
        { icon: <FiShoppingCart />, text: "Total Products", numbers: product },
        { icon: <FiClipboard />, text: "Total Orders", numbers: "21,309" },
    ];

    useEffect(() => {
        const FetchData = async () => {
            try {
                setloading(true);
                
                const Categories = await CategoriesCount();
                if (Categories.success) { setCategory(Categories?.data?.data); }

                const Product = await ProductsCount();
                if (Product.success) { setProduct(Product?.data?.data); }
            }
            catch (err) {console.log(err.response?.data.error);}
            finally {setloading(false);}
        };
        FetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
        <PageHeader text={"Dashboard"}/>
            {Dashboard.map((item, index) => (
                <section key={index} className="flex flex-col gap-10">
                    <div className="mt-5 mx-5 px-15 py-3 flex items-center gap-4 font-main">
                        <span className="flex items-center gap-3 whitespace-nowrap">
                            <span className="text-lg">{item.icon}</span>
                            {item.text}
                        </span>
                        <span className="flex-1 border-t-2 border-hover-bg"></span>
                        <span className="font-semibold">{item.numbers}</span>
                    </div>
                </section>
            ))}
        </>
    );
};