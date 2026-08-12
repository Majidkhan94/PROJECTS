import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Searchbar, Loading, PageHeader } from "../../Export.js";
import { CategoriesList, CategoriesDelete } from "../../APIs/CategoriesAPIs.js";

export const VenderAllCategoriesSection = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const listCategory = async () => {
        try {
            setLoading(true);
            const List = await CategoriesList();
            if (List.success) { setList(List?.data?.data || []); }
            else { setError(List?.message || "Failed to fetch categories"); }
        }
        catch (err) { setError(err?.response?.data?.message || "Something went wrong"); }
        finally { setLoading(false); }
    };

    useEffect(() => { listCategory(); }, []);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const Delete = await CategoriesDelete(id);
            if (Delete.success) {
                setList((prev) => prev.filter((item) => item.id !== id));
            } else {
                setError(Delete?.message || "Delete Failed");
            }
        }
        catch (err) { setError(err?.response?.data?.message || "Delete Failed"); }
        finally { setLoading(false); }
    };

    const filteredList = list.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <>
        <PageHeader text={"List of categories"}/>
            <div className="mt-6 p-4">
                <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Category..." />

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <div className="flex flex-col gap-5 mt-6">
                    {filteredList.map((category, index) => (
                        <section key={category.id || index} className="flex flex-col">
                            <div className="mt-2 mx-5 px-5 py-3 flex items-center gap-4 font-main bg-background-color rounded-xl">
                                <span className="flex items-center gap-3 whitespace-nowrap font-semibold">
                                    <img src={category.profilePicURL} alt={category.name} className="w-10 h-10 rounded-full object-cover" />
                                    {category.name}
                                </span>
                                <span className="flex-1 border-t-2 border-hover-bg"></span>
                                <Button text="Delete" type="button" onClick={() => handleDelete(category.id)} className={"text-sm hover:bg-red-600! hover:text-white!"} />
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
};