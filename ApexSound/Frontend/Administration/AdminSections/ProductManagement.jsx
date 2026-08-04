import { FaBox, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Button } from "../../src/Feature/Button.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../src/Feature/Input.jsx";
import { PageHeader } from "../../src/Feature/PageHeader.jsx";
import { Searchbar } from "../Component/Searchbar.jsx";
import { Heading } from "../../src/Feature/Heading.jsx";

export const ProductManagement = () => {

  // Search State
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  // Edit mode track karne ke liye — null = Add mode, id = Edit mode
  const [editingProductId, setEditingProductId] = useState(null);

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
  const [previewImage, setPreviewImage] = useState(
    "https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp"
  );

  // Categories Dropdown Fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_CATEGORY_LIST);
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      }
      catch (error) { console.error("Error fetching categories:", error); }
      finally { setLoading(false); }
    };
    fetchCategories();
  }, []);

  // InputFields Change Handler
  const handleInputChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, productPic: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Form ko reset karke wapas Add mode me le aao
  const resetForm = () => {
    setEditingProductId(null);
    setForm({ productPic: null, name: "", price: "", stock: "", products: "", categoryName: "", description: "" });
    setPreviewImage("https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp");
  };

  // Listing Products
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_PRODUCT_LIST);
      console.log("Fetched products:", response.data.data);
      setProducts(response.data.data);
    }
    catch (error) { console.error("Error fetching products:", error); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!form.productPic || !form.name || !form.price || !form.stock ||
      !form.products || !form.categoryName || !form.description) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("Name", form.name);
      formdata.append("Price", form.price);
      formdata.append("Stock", form.stock);
      formdata.append("Products", form.products);
      formdata.append("CategoryName", form.categoryName);
      formdata.append("Description", form.description);
      if (form.productPic) { formdata.append("ProductPic", form.productPic); }

      const response = await axios.post(import.meta.env.VITE_PRODUCT_ADD, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(response?.data?.message);
      resetForm();
      fetchProducts();
    }
    catch (error) {
      setError(error.response?.data?.error || "Failed to add product.");
    }
    finally { setLoading(false); }
  };  

  // Update Product ke liye form bharna (Edit button click)
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setForm({
      productPic: null, // nayi image tabhi bhejenge jab user badle
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      products: product.products || "",
      categoryName: product.categoryName || "",
      description: product.description || ""
    });
    setPreviewImage(product.productPicURL || "https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp");
   
  };

  // Update Product (submit)
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock ||
      !form.products || !form.categoryName || !form.description) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("Name", form.name);
      formdata.append("Price", form.price);
      formdata.append("Stock", form.stock);
      formdata.append("Products", form.products);
      formdata.append("CategoryName", form.categoryName);
      formdata.append("Description", form.description);
      if (form.productPic) { formdata.append("ProductPic", form.productPic); }

      const response = await axios.put(
        `${import.meta.env.VITE_PRODUCT_UPDATE}/${editingProductId}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess(response?.data?.message);
      resetForm();
      fetchProducts();
    }
    catch (error) {
      setError(error.response?.data?.error || "Failed to update product.");
    }
    finally { setLoading(false); }
  };

  // Form submit — Add ya Update, editingProductId ke hisaab se decide hoga
  const handleFormSubmit = (e) => {
    if (editingProductId) {
      handleUpdateProduct(e);
    } else {
      handleAddProduct(e);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_PRODUCT_DELETE}/${productId}`);
      setSuccess(response?.data?.message);
      fetchProducts();
    }
    catch (error) {
      setError(error.response?.data?.error || "Failed to delete product.");
    }
    finally { setLoading(false); }
  };

  return (<>
    <section className="mx-5 mt-5">

      {/* Search Bar */}
      <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />

      {/* No products found. */}
      {/* <span>
        {filteredProducts.length === 0 && <p className="text-white/50">No products found.</p>}
      </span> */}

      {/* Form (Add / Update) */}
      <div className="shadow-2xl shadow-white p-8 rounded-md w-full">
        <PageHeader text={editingProductId ? "Update Product" : "Add Product"} />

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          {/* Product Image */}
          <div className="flex justify-center">
            <label className="w-24 h-24 rounded-full overflow-hidden flex justify-center cursor-pointer">
              <img src={previewImage} alt="Product" className="w-full h-full object-cover" />
              <input type="file" name="productPic" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* Row-1 Fields */}
          <div className="flex gap-4">
            <Input type="text" placeholder="Name" name="name" value={form.name} onChange={handleInputChange} />
            <Input type="number" placeholder="Price" name="price" value={form.price} onChange={handleInputChange} />
            <Input type="number" placeholder="Stock" name="stock" value={form.stock} onChange={handleInputChange} />
          </div>

          {/* Row-2 Fields */}
          <div className="flex gap-8">
            <select name="products" className="flex-1 rounded-full px-3 py-2 bg-white/5 text-hover-bg"
              value={form.products} onChange={handleInputChange}>
              <option value="" disabled className="text-black font-semibold">Select Products</option>
              <option value="FeatureProducts" className="text-black font-semibold">FeatureProducts</option>
              <option value="SimpleProducts" className="text-black font-semibold">SimpleProducts</option>
            </select>

            <select name="categoryName" className="flex-1 rounded-full px-3 py-2 bg-white/5 text-hover-bg"
              value={form.categoryName} onChange={handleInputChange}>
              <option value="" disabled className="text-black font-semibold">Select Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name} className="text-black font-semibold">
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Row 3 - Description */}
          <div className="flex">
            <Input type="text" placeholder="Description" name="description"
              value={form.description} onChange={handleInputChange} />
          </div>

          {/* Row 4 - Buttons */}
          <div className="flex justify-end gap-3">
            {editingProductId && (
              <Button text="Cancel" type="button" onClick={resetForm} />
            )}
            <Button
              text={loading ? "Saving..." : editingProductId ? "Update Product" : "Add Product"}
              type="submit"
            />
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
            {success}
          </div>
        )}
      </div>

      {/* List of Products */}
      <div className="shadow-2xl shadow-white p-8 rounded-md w-full">
        <PageHeader text="All Products" />

        {/* Header Row */}
        <div className="flex items-center gap-4 pb-3 border-b border-white/20">
          <Heading text="" className="w-14" />
          <Heading text="Products Name" className="flex-1" />
          <Heading text="Slug" className="flex-1" />
          <Heading text="Actions" className="w-64 text-right" />
        </div>

        {/* Product Rows */}
        <div className="mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 py-3 border-b border-white/20"
            >
              <img
                src={product.productPicURL}
                alt={product.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <p className="flex-1">{product.name}</p>
              <p className="flex-1 text-white/60">{product.slug}</p>

              <div className="flex gap-2 w-64 justify-end">
                <Button text="Update" onClick={() => handleEditClick(product)} />
                <Button text="Delete" onClick={() => handleDeleteProduct(product.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  </>);
};