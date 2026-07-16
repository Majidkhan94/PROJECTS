import { useState, useEffect } from "react";

export const AdminCategories = () => {

    const BASE_URL = "https://localhost:7001/api/Category";

    // Data store karne ke liye state
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");        // Add ke liye input value
    const [editId, setEditId] = useState(null);   // Update karte waqt kaunsi Id hai

    // ================= FUNCTIONS =================

    // List Categories
    const getCategories = async () => {
        const response = await fetch(`${BASE_URL}/list`);
        const data = await response.json();
        setCategories(data);   // state me store kar diya, ab UI me dikhega
    };

    // Add Category
    const addCategory = async () => {
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name })
        });
        const data = await response.json();
        console.log(data);

        setName("");           // input khaali karo
        getCategories();        // list dobara fetch karo (naya item dikhane ke liye)
    };

    // Update Category
    const updateCategory = async () => {
        const response = await fetch(`${BASE_URL}/update/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name })
        });
        const data = await response.json();
        console.log(data);

        setName("");
        setEditId(null);
        getCategories();
    };

    // Delete Category
    const deleteCategory = async (id) => {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);

        getCategories();   // list refresh karo delete ke baad
    };

    // Edit button click hone par input me purana Name bhar do
    const handleEditClick = (category) => {
        setEditId(category.id);
        setName(category.name);
    };

    // Page load hote hi List call ho jaye
    useEffect(() => {
        getCategories();
    }, []);

    // ================= UI =================

    return (
        <>
            <h2>Categories</h2>

            {/* Input + Add/Update button */}
            <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {editId ? (
                <button onClick={updateCategory}>Update</button>
            ) : (
                <button onClick={addCategory}>Add</button>
            )}

            {/* List Table */}
            <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.slug}</td>
                            <td>
                                <button onClick={() => handleEditClick(cat)}>Edit</button>
                                <button onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this category?")) {
                                        deleteCategory(cat.id);
                                    }
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};