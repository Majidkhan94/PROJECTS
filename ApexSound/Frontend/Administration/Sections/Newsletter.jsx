import { useState, useEffect } from "react";
import axios from "axios";
import {Paragraph} from "../../src/Feature/Paragraph.jsx"
import {Button} from "../../src/Feature/Button.jsx"


export const Newsletter = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // LIST
    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_NEWSLETTER_LIST}`);
            setList(response.data.data); setError("");
        } 
        catch (err) { setError("Failed to load newsletter list."); } 
        finally { setLoading(false);}};

    // DELETE
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_NEWSLETTER_DELETE}/${id}`);
            setList((prev) => prev.filter((item) => item.id !== id));
        } 
        catch (err) { setError("Failed to delete entry.");}};

    useEffect(() => {
        fetchList();
    }, []);

    if (loading) return <Paragraph text={"Loading......"} />;

    return (<>
        <div className="flex flex-col gap-2">
            {error && <Paragraph text={error} className={"text-red-600"} />}

            {list.length === 0 
            ? ( <Paragraph text={"No subscribers yet."} />) 
            : (
                <ul className="flex flex-col gap-5 p-10">
                    {list.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b py-2">
                            <span className="text-sm">{item.email}</span>
                            <Button text={"Delete"} onClick={()=> handleDelete(item.id)} className={"text-red-600!"} />                          
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>);
};