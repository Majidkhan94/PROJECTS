import { useState } from "react";
import { Input, Button, Loading, PageHeader } from "../../Export.js";
import { FaImage } from "react-icons/fa";
import { CategoriesAdd } from "../../APIs/CategoriesAPIs.js";

export const AdminAddCategoriesSection = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

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
    };

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("Name", name);
            if (image) { formData.append("ProfilePic", image); }

            const response = await CategoriesAdd(formData);
            if (response.success) {
                resetForm();
            } else {
                setError(response?.message || "Not Added");
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Not Added");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <PageHeader text={"Add categories"} />
            <div className="mt-6 p-4">
                <div className="bg-background-color rounded-2xl p-6 mb-8 max-w-xl mx-auto">
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
                            <Button
                                text={loading ? "Saving..." : "Add Category"}
                                type="submit"
                                className={"text-sm!"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};