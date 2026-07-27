import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Categories = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
                setList(response.data);
            }
            catch (error){console.log(error);}
        };
        fetchData();
    }, []);

    return (
        <>
            <section className="flex flex-wrap gap-6 p-6">
                {list.map((item) => (
                <Link key={item.id} to={`/categories/${item.slug}`}
                    className="flex flex-col items-center w-50 group cursor-pointer">
                    
                    {/* Image box */}
                    
                    <div className="w-full rounded-xl overflow-hidden transition-transform duration-500 
                    group-hover:scale-105">
                        <img src={item.profilePicURL || "/placeholder-image.png"}
                        className="w-full h-full object-cover" />
                    </div>

                    {/* Category Name */}
                    <span className="mt-3 group-hover:text-hover-bg transition-colors">
                    {item.name}
                    </span>
                </Link>
                ))}
            </section>
        </>
    );
};