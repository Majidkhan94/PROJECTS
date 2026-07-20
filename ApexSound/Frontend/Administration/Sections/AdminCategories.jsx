import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "../../src/Feature/Input.jsx";
import { Button } from "../../src/Feature/Button.jsx";
import { Heading } from "../../src/Feature/Heading.jsx";
import { Paragraph } from "../../src/Feature/Paragraph.jsx";

export const AdminCategories = () => {

    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    // List Category — function bahar banayi, taake har jagah se call ho sake
    const listCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}Category/list`);
            setList(response.data);
        } catch (error) {
            console.log("Not Fetched:", error);
        }
    };

    useEffect(() => {
        listCategory();
    }, []);

    // Add Category
    const addCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}Category/add`, { name: name });
            setName("");
            listCategory();   // list refresh
        } catch (error) {
            console.log("Not Added:", error);
        }
    };

    // Edit mode on karo
    const handleEditClick = (item) => {
        setEditId(item.id);
        setEditName(item.name);
    };

    // Update Category
    const updateCategory = async (Id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}Category/update/${Id}`, { name: editName });
            setEditId(null);
            setEditName("");
            listCategory();   // ab ye kaam karega, kyunke function scope me hai
        } catch (error) {
            console.log("Not Updated:", error);
        }
    };

    // Delete Category — missing function add ki
    const deleteCategory = async (Id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}Category/delete/${Id}`);
            listCategory();   // list refresh
        } catch (error) {
            console.log("Not Deleted:", error);
        }
    };

    return (
        <>
            <div className="mt-6 p-4">

                {/* Header Row */}
                <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200">
                    <Heading text={"Category Name"} className={"flex-1"} />
                    <Heading text={"Slug"} className={"flex-1"} />
                    <div className="w-40"></div>
                </div>

                {/* Data Rows */}
                {list.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-4 py-3">

                        {editId === item.id ? (
                            <Input
                                type={"text"}
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                            />
                        ) : (
                            <Paragraph text={item.name} className={"flex-1"} />
                        )}

                        <Paragraph text={item.slug} className={"flex-1"} />

                        {editId === item.id ? (
                            <Button text={"Save"} onClick={() => updateCategory(item.id)} className={"bg-green-700"} />
                        ) : (
                            <Button text={"Update"} onClick={() => handleEditClick(item)} className={"bg-green-700"} />
                        )}

                        <Button text={"Delete"} onClick={() => deleteCategory(item.id)} className={"bg-red-700"} />
                    </div>
                ))}
            </div>

            {/* Add Categories */}
            <div className="px-4 py-4 mt-4">
                <form onSubmit={addCategory} className="flex items-center gap-10">
                    <Input
                        type={"text"}
                        placeholder={"Category Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 border-0 border-gray-600 px-4 py-2 text-sm"
                    />
                    <Button type={"submit"} text={"Add"} className={"w-58"} />
                </form>
            </div>
        </>
    );
};