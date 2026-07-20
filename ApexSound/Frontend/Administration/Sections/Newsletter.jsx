import { useState, useEffect } from "react";
import axios from "axios";

export const Newsletter = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    // GET - list fetch karna
    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}Newsletter/list`);
            console.log(response.data);
            setList(response.data.data);
            setError("");
        } catch (err) {
            console.error("Error", err);
            setError("Failed to load newsletter list.");
        } finally {
            setLoading(false);
        }
    };

    // DELETE - single entry delete karna
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}Newsletter/delete/${id}`);
            console.log(response.data);
            // list se woh entry hata do bina dobara fetch kiye (fast UX)
            setList((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error", err);
            setError("Failed to delete entry.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    if (loading) return <p className="text-sm">Loading...</p>;

    return (
        <div className="flex flex-col gap-2">
            {error && <p className="text-sm text-red-500">{error}</p>}

            {list.length === 0 ? (
                <p className="text-sm">No subscribers yet.</p>
            ) : (
                <ul className="flex flex-col gap-5 p-10">
                    {list.map((item) => (
                        <li
                            key={item.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <span className="text-sm">{item.email}</span>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-sm text-red-500 cursor-pointer"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};