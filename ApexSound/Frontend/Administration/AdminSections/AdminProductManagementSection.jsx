import { FaBox, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

import { Button, Searchbar, Input, Heading, PageHeader, Paragraph } from "../../Export.js";
import { ProductsList, ProductsAdd, ProductsUpdate, ProductsDelete } from "../../APIs/ProductAPIs.js";
import { CategoriesList } from "../../APIs/CategoriesAPIs.js";

export const AdminProductManagementSection = () => {

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
        const response = await CategoriesList();
        if (response.success) {
          setCategories(response?.data?.data || []);
        } else {
          setCategories([]);
        }
      }
      catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
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
  // const resetForm = () => {
  //   setEditingProductId(null);
  //   setForm({ productPic: null, name: "", price: "", stock: "", products: "", categoryName: "", description: "" });
  //   setPreviewImage("https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp");
  // };

  // Listing Products
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductsList();
      if (response.success) {
        setProducts(response?.data?.data || []);
      } else {
        setProducts([]);
      }
    }
    catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = (products || []).filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!form.productPic || !form.name || !form.price || !form.stock ||
      !form.products || !form.categoryName || !form.description) {
      setError("Please fill in all fields.");
      return;
    }
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

      const response = await ProductsAdd(formdata);

      if (response.success) {
        setSuccess(response?.message || "Product added successfully.");
        //resetForm();
        setForm({ ...form, productPic: null, name: "" });
        setPreviewImage("https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp");
        
        fetchProducts();
      } else {
        setError(response?.message || "Failed to add product.");
      }
    }
    catch (error) {
      setError(error?.response?.data?.message || "Failed to add product.");
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

      const response = await ProductsUpdate(editingProductId, formdata);

      if (response.success) {
        setSuccess(response?.message || "Product updated successfully.");
        //resetForm();
        setForm({ ...form, productPic: null, name: "" });
        setPreviewImage("https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp");
        fetchProducts();
      } else {
        setError(response?.message || "Failed to update product.");
      }
    }
    catch (error) {
      setError(error?.response?.data?.message || "Failed to update product.");
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
      const response = await ProductsDelete(productId);

      if (response.success) {
        setSuccess(response?.message || "Product deleted successfully.");
        fetchProducts();
      } else {
        setError(response?.message || "Failed to delete product.");
      }
    }
    catch (error) {
      setError(error?.response?.data?.message || "Failed to delete product.");
    }
    finally { setLoading(false); }
  };

  return (<>
    <section className="mx-5 mt-5">

      {/* Search Bar */}
      <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />

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
              <Button text="Cancel" type="button" onClick={() => setEditingProductId(null)} />
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
      {/* List of Products */}
<div className="mx-5 mt-5">
  <PageHeader text="All Products" />

  {/* Product Cards */}
  <div className="flex flex-wrap gap-5 mt-6">
    {filteredProducts.map((product) => (
      <div key={product.id} className="bg-background-color rounded-2xl p-6 w-[calc(33.333%-1.34rem)]">
        
        {/* Image + Name header, underline below */}
       <div className="pb-4 mb-5 border-b">
  <div className="flex flex-col items-center gap-2">
    <img
      src={product.productPicURL}
      alt={product.name}
      className="w-14 h-14 rounded-full object-cover"
    />
    <div className="flex flex-col items-center text-lg font-semibold">
      <span>{product.name}</span>
      <span>{`[ ${product.products} ]`}</span>
    </div>
  </div>
</div>

        {/* Fields stacked vertically */}
        <div className="flex flex-col gap-2">
          <Paragraph text={`Price: ${product.price}`} />
          <Paragraph text={`Stock: ${product.stock}`} />
          <Paragraph text={`Category: ${product.categoryName}`} />
          <Paragraph text={`Description: ${product.description}`} />
        </div>

        {/* Update / Delete buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => handleEditClick(product)}
            text={"Update"}
            className={"flex-1"}
          />
          <Button
            onClick={() => handleDeleteProduct(product.id)}
            text={"Delete"}
            className={"flex-1 hover:bg-button-redhover"}
          />
        </div>
      </div>
    ))}
  </div>

  {filteredProducts.length === 0 && (
    <PageHeader text={"No products found."} className={"text-button-redhover"} />
  )}
</div>

    </section>
  </>);
};