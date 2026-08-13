import { useState, useEffect } from "react";
import {Heading, Paragraph, Button, PageHeader, CategoryCard, Loading,Pagetitle} from "../Export.js";
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
    return (<>

            <Pagetitle title={"categories"}/>
            <PageHeader text={"categories"}/>
            
            <section className="flex flex-wrap gap-4 justify-center items-center pb-10">
                {list.length > 0
                ? (list.map((category) => (<CategoryCard key={category.id} category={category}/>)))
                : (<PageHeader text={"No Category products found."}/>) 
            }
                                
            </section>
        </>
    );
};  