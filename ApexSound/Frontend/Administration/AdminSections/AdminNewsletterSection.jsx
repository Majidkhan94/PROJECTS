
////////////////////////////// Completed //////////////////////////////

import { useState, useEffect } from "react";
import {Button, Paragraph, NewsletterList, NewsletterDelete, Loading, PageHeader, Searchbar} from "../../Export.js";


export const AdminNewsletterSection = () => {
    
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // FETCH-LIST
    useEffect(()=>{
        const FetchData = async () => {
            try{
                setLoading(true)
                const List = await NewsletterList();
                if(List.success){ setList(List?.data?.data) }
                else{ setError(List?.message || "Error Fetching Apis") }
            }
            catch(err){ setError(err?.response?.data?.message || "Something Went Wrong") }
            finally{ setLoading(false) }
        }; 
        FetchData()
    },[])


    // DELETE
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const Delete = await NewsletterDelete(id);
            if(Delete.success){ setList((Newsletter) => Newsletter.filter((item) => item.id !== id)); }
            else{ setError(Delete?.message || "Error deleting subscriber") }
        } 
        catch (err) { setError(err?.response?.data?.message || "Something Went Wrong"); }
        finally{ setLoading(false) }
    };
  
    const filterlist = list.filter((item) =>
        item.email?.toLowerCase().includes(search.toLowerCase())
    );


    if (loading) return <Loading />;
    return (<>

            {/* Searchbar */}
            <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search emails..." />
            

        <div className="flex flex-col gap-2">
            {error && <PageHeader text={error} className={"text-button-redhover"}/>}

            {filterlist.length === 0 
            ? ( <PageHeader text={"No subscribers yet..."}/>) 
            : ( <ul className="flex flex-col gap-5 p-10">
                {filterlist.map((item) => (
                 <li key={item.id} className="flex justify-between items-center border-b py-2">
                    <span className="text-sm">{item.email}</span>
                    <Button text={"Delete"} onClick={()=> handleDelete(item.id)} 
                    className={"hover:bg-button-redhover"}  />                          
                 </li>))}
                </ul>)}
        </div>
    </>)};