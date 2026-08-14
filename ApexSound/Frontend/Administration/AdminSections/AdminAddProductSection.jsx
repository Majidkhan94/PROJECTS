import { useState, useEffect } from "react";
import { Button, Input, PageHeader } from "../../Export.js";
import { ProductsAdd } from "../../APIs/ProductAPIs.js";
import { CategoriesList } from "../../APIs/CategoriesAPIs.js";
import { FaImage } from "react-icons/fa";

export const AdminAddProductSection = () => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    productPic: null,
    name: "",
    price: "",
    stock: "",
    products: "",
    categoryName: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await CategoriesList();
        if (response.success) {
          setCategories(response?.data?.data || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, productPic: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !form.productPic ||
      !form.name ||
      !form.price ||
      !form.stock ||
      !form.products ||
      !form.categoryName ||
      !form.description
    ) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const formdata = new FormData();
      formdata.append("Name", form.name);
      formdata.append("Price", form.price);
      formdata.append("Stock", form.stock);
      formdata.append("Products", form.products);
      formdata.append("CategoryName", form.categoryName);
      formdata.append("Description", form.description);
      formdata.append("UserId", localStorage.getItem("adminId"));
      if (form.productPic) {
        formdata.append("ProductPic", form.productPic);
      }

      const response = await ProductsAdd(formdata);

      if (response.success) {
        setSuccess(response?.message || "Product added successfully.");
        setForm({
          productPic: null,
          name: "",
          price: "",
          stock: "",
          products: "",
          categoryName: "",
          description: ""
        });
        setPreviewImage(null);
      } else {
        setError(response?.message || "Failed to add product.");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader text={"Add Product"} />
      <div className="mt-6 p-4">
        <div className="bg-background-color rounded-2xl p-6 mb-8 max-w-xl mx-auto">
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-500 text-center mt-2">{success}</p>}

          <form className="flex flex-col gap-4 mt-5" onSubmit={handleAddProduct}>
            <div className="flex justify-center">
              <label className="w-24 h-24 rounded-full overflow-hidden flex justify-center cursor-pointer border border-dashed border-white/20 bg-white/5 items-center">
                {previewImage ? (
                  <img src={previewImage} alt="Product" className="w-full h-full object-cover" />
                ) : (
                  <FaImage className="text-white/30" size={20} />
                )}
                <input type="file" name="productPic" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            <div className="flex gap-4">
              <Input type="text" placeholder="Name" name="name" value={form.name} onChange={handleInputChange} />
              <Input type="number" placeholder="Price" name="price" value={form.price} onChange={handleInputChange} />
              <Input type="number" placeholder="Stock" name="stock" value={form.stock} onChange={handleInputChange} />
            </div>

            <div className="flex gap-4">
              <select
                name="products"
                className="flex-1 rounded-full px-3 py-2 bg-white/5 text-hover-bg outline-none"
                value={form.products}
                onChange={handleInputChange}
              >
                <option value="" disabled className="text-black font-semibold">Select Products</option>
                <option value="FeatureProducts" className="text-black font-semibold">FeatureProducts</option>
                <option value="SimpleProducts" className="text-black font-semibold">SimpleProducts</option>
              </select>

              <select
                name="categoryName"
                className="flex-1 rounded-full px-3 py-2 bg-white/5 text-hover-bg outline-none"
                value={form.categoryName}
                onChange={handleInputChange}
              >
                <option value="" disabled className="text-black font-semibold">Select Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name} className="text-black font-semibold">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex">
              <Input type="text" placeholder="Description" name="description" value={form.description} onChange={handleInputChange} />
            </div>

            <div className="flex justify-end gap-3">
              <Button text={loading ? "Saving..." : "Add Product"} type="submit" className={"text-sm!"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};