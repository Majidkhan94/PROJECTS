import axios from "axios"
import { useState, useEffect } from "react"
import { Button, Heading, Paragraph } from "../../Export.js";
import { MdContactPhone } from "react-icons/md"

export const adminContactus = () => {

    const [list, SetList] = useState([])
    const [loading, SetLoading] = useState(false)
    const [error, SetError] = useState(null)

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const Fetchdata = async () => {
            SetLoading(true)
            SetError(null)
            try {
                const response = await axios.get(`${import.meta.env.VITE_CONTACTUS_LIST}`,
                    { headers: { Authorization: `Bearer ${token}` }});
                SetList(response?.data?.data || []);}
            catch (err) {SetError(err?.response?.data?.message || "Contact List Error");}
            finally {SetLoading(false);}
        }
            Fetchdata();
            }, []);

    // Delete Handler
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_CONTACTUS_DELETE}/${id}`,
                { headers: { Authorization: `Bearer ${token}` }});
            SetList((prev) => prev.filter((item) => item.id !== id));
        }
        catch (err) {SetError(err?.response?.data?.message || "Delete Failed");}
    }

    return (
        <section className="p-8 flex flex-wrap gap-6">
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {list.map((item) => (
                <div key={item.id} className="border border-gray-800 rounded-2xl p-6 w-full max-w-sm" >
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
        </section>
    );
}