import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Heading, Paragraph, Searchbar, Loading } from "../../Export.js";
import { FaImage } from "react-icons/fa";
import { CategoriesList, CategoriesDelete } from "../../APIs/CategoriesAPIs.js"

export const AdminCategoriesSection = () => {

    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editId, setEditId] = useState(null);

    // List Categories
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setName("");
        setImage(null);
        setPreview(null);
        setEditId(null);
    };

    // Add and Update 
    const addCategory = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("Name", name);
            if (image) { formData.append("ProfilePic", image); }

            if (editId) {
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}Category/update/${editId}`, formData);
            } else {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}Category/add`, formData);
            }

            resetForm();
            listCategory();
        } catch (error) {
            setError(error?.response?.data?.message || "Not Added");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setEditId(category.id);
        setName(category.name);
        setPreview(category.profilePicURL);
        setImage(null);
    };

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

    if(loading) return <Loading />
    return (
        <>
            <div className="mt-6 p-4">
                <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Category..." />

                <div className="bg-background-color rounded-2xl p-6 mb-8">
                    <Heading text={editId ? "Edit Category" : "Add New Category"} className={"text-center"} />

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <form className="flex flex-col gap-4 mt-5" onSubmit={addCategory}>
                        <div className="flex justify-center">
                            <label className="w-24 h-24 rounded-full overflow-hidden flex justify-center cursor-pointer border border-dashed border-white/20 bg-white/5 items-center">
                                {preview ? (
                                    <img src={preview} alt="Category" className="w-full h-full object-cover" />
                                ) : (
                                    <FaImage className="text-white/30" size={20} />
                                )}
                                <input type="file" name="categoryImage" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <Input
                                type="text"
                                placeholder="Category Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            {editId && (
                                <Button text="Cancel" type="button" onClick={resetForm} />
                            )}
                            <Button
                                text={loading ? "Saving..." : editId ? "Update Category" : "Add Category"}
                                type="submit"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex flex-wrap gap-6">
                    {filteredList.map((category) => (
                        <div key={category.id} className="bg-background-color rounded-2xl overflow-hidden w-64">
                            <div className="relative w-full h-40 overflow-hidden">
                                <img src={category.profilePicURL} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 flex flex-col gap-3">
                                <Paragraph text={category.name} className={"text-[16px]! font-semibold"} />
                                <div className="flex gap-3">
                                    <Button text="Edit" type="button" onClick={() => handleEdit(category)} className={"flex-1 text-sm"} />
                                    <Button text="Delete" type="button" onClick={() => handleDelete(category.id)} className={"flex-1 text-sm hover:bg-red-600! hover:text-white!"} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};