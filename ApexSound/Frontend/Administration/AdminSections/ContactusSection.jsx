import { useState, useEffect } from "react"
import { Button, Heading, Loading, Searchbar } from "../../Export.js";
import { MdContactPhone } from "react-icons/md"
import {ContactusList, ContactusDelete} from "../../APIs/ContactusAPIs.js"

export const ContactusSection = () => {

    const [list, SetList] = useState([])
    const [search, setSearch] = useState("")
    const [loading, SetLoading] = useState(false)
    const [error, SetError] = useState(null)

    useEffect(() => {
        const Fetchdata = async () => {
            SetLoading(true)
            try {
                const list = await ContactusList();
                if(list.success){ SetList(list?.data?.data) }
                else{ SetError(list?.message || "Error Fetching Contacts") }
            }
            catch (err) { SetError(err?.response?.data?.message || "Contact List Error"); }
            finally { SetLoading(false); }
        }
        Fetchdata();
    }, []);

    const handleDelete = async (id) => {
        try {
            var accessToken = localStorage.getItem("accessToken");
            const Delete = await ContactusDelete(id, { Authorization: `Bearer ${accessToken}` });
            if(Delete.success){
              SetList((prev) => prev.filter((item) => item.id !== id));
            } else {
              SetError(Delete?.message || "Delete Failed");
            }
        }
        catch (err) {
          SetError(err?.response?.data?.message || "Delete Failed");
        }
    }

    const filterlist = list.filter((item) =>
        item.email?.toLowerCase().includes(search.toLowerCase())
    );

    if(loading) return <Loading />
    return (
        <section className="p-8 flex flex-col gap-6">
            <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contact by email..." />
            <div className="flex flex-wrap gap-6">
                {filterlist.map((item) => (
                    <div key={item.id} className="bg-background-color rounded-2xl p-6 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]" >
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-800 mb-4">
                            <MdContactPhone className="text-white text-xl" />
                            <Heading text={`Message #${item.id}`} className="text-lg! font-semibold!" />
                        </div>

    <div className="flex flex-col gap-2 text-sm mb-6">
        <p>
            <span className="text-gray-500 uppercase text-xs mr-2">Name:</span>
            <span>{item.fullname}</span>
        </p>
        <p>
            <span className="text-gray-500 uppercase text-xs mr-2">Email:</span>
            <span>{item.email}</span>
        </p>
        <p>
            <span className="text-gray-500 uppercase text-xs mr-2">Message:</span>
            <span>{item.message}</span>
        </p>
    </div>

    <div className="flex gap-3">
        <Button text="Delete" onClick={() => handleDelete(item.id)} className={"w-full hover:bg-red-600! hover:text-white!"} />
    </div>
</div>
                ))}
            </div>
        </section>
    );
}