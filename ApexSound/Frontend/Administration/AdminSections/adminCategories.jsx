import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Button, Heading, Paragraph, Searchbar } from "../../Export.js";
import { FaSearch, FaImage } from "react-icons/fa";

export const adminCategories = () => {

    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [list, setList] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editImage, setEditImage] = useState(null);       // naya — edit mode ke liye image
    const [editPreview, setEditPreview] = useState(null);   // naya — edit mode ka preview

    const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const listCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
            setList(response.data);
        } catch (error) {
            console.log("Not Fetched:", error);
        }
    };

    useEffect(() => {
        listCategory();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("Name", name);
            if (image) {
                formData.append("ProfilePic", image);
            }

            await axios.post(`${import.meta.env.VITE_CATEGORY_ADD}`, formData);

            setName("");
            setImage(null);
            setPreview(null);
            listCategory();
        } catch (error) {
            console.log("Not Added:", error);
        }
    };

    // Edit mode on karo — purani image bhi preview mein daal do
    const handleEditClick = (item) => {
        setEditId(item.id);
        setEditName(item.name);
        setEditImage(null);
        setEditPreview(item.profilePicURL || null);
    };

    // Edit mode mein image select karne ke liye
    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImage(file);
            setEditPreview(URL.createObjectURL(file));
        }
    };

    // Update Category — ab naam + image dono FormData se
    const updateCategory = async (Id) => {
        try {
            const formData = new FormData();
            formData.append("Name", editName);
            if (editImage) {
                formData.append("ProfilePic", editImage);
            }

            await axios.put(`${import.meta.env.VITE_CATEGORY_UPDATE}/${Id}`, formData);

            setEditId(null);
            setEditName("");
            setEditImage(null);
            setEditPreview(null);
            listCategory();
        } catch (error) {
            console.log("Not Updated:", error);
        }
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName("");
        setEditImage(null);
        setEditPreview(null);
    };

    const deleteCategory = async (Id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_CATEGORY_DELETE}/${Id}`);
            listCategory();
        } catch (error) {
            console.log("Not Deleted:", error);
        }
    };

    return (
        <>
            <div className="mt-6 p-4">

                {/* Search bar */}
                <Searchbar type={"text"} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search category..." />
                

                {/* Add Category Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                    <h3 className="text-white font-semibold text-lg mb-4">Add New Category</h3>

                    <form onSubmit={addCategory} className="flex items-center gap-5">
                        <label htmlFor="categoryImage" className="cursor-pointer group shrink-0">
                            <div className="w-16 h-16 rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center overflow-hidden group-hover:border-white/40 transition-colors">
                                {preview ? (
                                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <FaImage className="text-white/30" size={20} />
                                )}
                            </div>
                            <input
                                id="categoryImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        <Input
                            type={"text"}
                            placeholder={"Category Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                        />

                        <Button type={"submit"} text={"Add"} className={"px-8 py-2.5 rounded-lg shrink-0"} />
                    </form>
                </div>

                {/* Header Row */}
                <div className="flex items-center gap-4 px-0 py-2 border-b border-white/10">
                    <div className="w-16"></div>
                    <Heading text={"Category Name"} className={"flex-1 text-2xl!"} />
                    <Heading text={"Slug"} className={"flex-1 text-2xl!"} />
                    <div className="w-52"></div>
                </div>

                {/* Data Rows */}
                {filteredList.length > 0 ? (
                    filteredList.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors">

                            {editId === item.id ? (
                                <>
                                    {/* Edit mode — image click karke change ho sakti hai */}
                                    <label htmlFor={`editImage-${item.id}`} className="cursor-pointer group shrink-0">
                                        <div className="w-12 h-12 rounded-lg border border-dashed border-white/20 overflow-hidden group-hover:border-white/40 transition-colors">
                                            <img
                                                src={editPreview || "/placeholder-image.png"}
                                                alt="edit preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <input
                                            id={`editImage-${item.id}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleEditImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <Input
                                        type={"text"}
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                                    />
                                </>
                            ) : (
                                <>
                                    <img
                                        src={item.profilePicURL || "/placeholder-image.png"}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-lg border border-white/10"
                                    />
                                    <Paragraph text={item.name} className={"flex-1"} />
                                </>
                            )}

                            <Paragraph text={item.slug} className={"flex-1"} />

                            <div className="flex items-center gap-2 w-52 justify-end">
                                {editId === item.id ? (
                                    <>
                                        <Button text={"Save"} onClick={() => updateCategory(item.id)} className={"hover:bg-green-700! hover:text-white!"} />
                                        <Button text={"Cancel"} onClick={cancelEdit} className={"hover:bg-gray-600! hover:text-white!"} />
                                    </>
                                ) : (
                                    <Button text={"Update"} onClick={() => handleEditClick(item)} className={"hover:bg-green-700! hover:text-white!"} />
                                )}
                                <Button text={"Delete"} onClick={() => deleteCategory(item.id)} className={"hover:bg-red-600! hover:text-white!"} />
                            </div>
                        </div>
                    ))
                ) : (
                    <Paragraph text={"No categories found."} className={"px-4 py-3 text-gray-500"} />
                )}
            </div>
        </>
    );
};