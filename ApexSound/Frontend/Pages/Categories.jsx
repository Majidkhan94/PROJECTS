import { useState, useEffect } from "react";
import {Heading, Paragraph, Button, PageHeader, CategoryCard, Loading} from "../Export.js";
import {CategoriesList} from "../APIs/CategoriesAPIs.js"

export const Categories = () => {

    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const list = await CategoriesList();
                if(list.success){ setList(list?.data?.data || []) }
                else{ setError(list?.message || "Failed to fetch categories") }
            }
            catch (error){ setError(error?.response?.data?.message || "Something went wrong") }
            finally{ setLoading(false) }
        };
        fetchData();
    }, []);
    
    if(loading) return <Loading />
    return (
        <>
            <PageHeader text={"Categories"} />
            <section className="flex flex-wrap gap-6 p-6">
                
                {list.map((category) => (
                    <CategoryCard key={category.id} category={category}/>
                ))}
                
            </section>
        </>
    );
};  