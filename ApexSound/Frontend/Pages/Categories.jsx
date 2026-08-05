import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Heading, Paragraph, Button, PageHeader} from "../Export.js";


// Card
const Card = ({ category }) => {
if (!category) return null;

const {name,profilePicURL,slug,} = category;


return (<>

    <Link to={`/categories/${slug}`}>
    <div className="w-72 bg-hover-bg rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
        
        {/* Image */}
      <div className="relative w-full overflow-hidden">
        <img src={profilePicURL} className="w-full h-full object-cover" />
      </div>

        {/* Button   */}
      <div className="px-4 pt-4 pb-4">
        <Button text={name} className={"mt-4 w-full text-sm font-medium"} />
      </div>
    </div>
    </Link>
  </>);};



export const Categories = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
                setList(response.data);
                console.log(response.data);
            }
            catch (error){console.log(error);}
        };
        fetchData();
    }, []);

    return (
        <>
            <PageHeader text={"Categories"} />

            <section className="flex flex-wrap gap-6 p-6">
                
                {list.map((category) => (
                    <Card key={category.id} category={category}/>
                ))}
                
            </section>
        </>
    );
};