import { useState, useEffect } from "react";
import {Button, Paragraph, NewsletterList, NewsletterDelete, Loading, PageHeader} from "../../Export.js";


export const Newsletter = () => {
    
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // FETCH-LIST
    
    useEffect(()=>{
        const FetchData = async () => {
            try{
                setLoading(true)
                const List = await NewsletterList();
                if(List.success){setList(List?.data?.data)}
                else{console.log(setList(List?.data?.data || "Error Fetching Apis"))}
            }
            catch(err){setError(err?.List?.data?.data)}
            finally{setLoading(false)}
        }; FetchData()},[])


    // DELETE
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const Delete = await NewsletterDelete(id);
            if(Delete.success){setList((Newsletter) => Newsletter.filter((item) => item.id !== id));}
            else{console.log(setError(Delete?.data.message))}
        } 
        catch (err) { setError(err?.Delete?.data?.message);}
        finally{setLoading(false)}};
  
    
    if (loading) return <Loading />;
    return (<>

            

        <div className="flex flex-col gap-2">
            {error && <PageHeader text={error} className={"text-button-redhover"}/>}

            {list.length === 0 
            ? ( <PageHeader text={"No subscribers yet..."}/>) 
            : ( <ul className="flex flex-col gap-5 p-10">
                {list.map((item) => (
                 <li key={item.id} className="flex justify-between items-center border-b py-2">
                    <span className="text-sm">{item.email}</span>
                    <Button text={"Delete"} onClick={()=> handleDelete(item.id)} 
                    className={"hover:bg-button-redhover"}  />                          
                 </li>))}
                </ul>)}
        </div>
    </>)};