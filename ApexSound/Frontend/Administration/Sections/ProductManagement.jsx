import { FaBox, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Button } from "../../src/Feature/Button.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import {Input} from "../../src/Feature/Input.jsx";
import {PageHeader} from "../../src/Feature/PageHeader.jsx";
import { Searchbar } from "../Component/Searchbar.jsx";


export const ProductManagement = () => {
  
  // Search State
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    
    "productPic": null,
    "name": "",
    "price": "",
    "stock": "",
    "products": "",
    "categoryName": "",
    "description": ""
  
  });
  
  const [editproduct, setEditProduct] = useState([]);
  const [deleteproduct, setDeleteProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState("https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp"); 
 
  // Categories Dropdown Fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_CATEGORY_LIST);
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      }
      catch (error) {console.error("Error fetching categories:", error);}
      finally {setLoading(false);}

    }; 
    fetchCategories();
  }, []);  
  
  // InputFields Change Handler
  const handleInputChange = (e) =>{setForm({...form,[e.target.name]: e.target.value});};  

  //  Image Upload Handler
  const handleImageChange = (e) => {
      const file = e.target.files[0];
      setForm({ ...form, productPic: file });
      setPreviewImage(URL.createObjectURL(file));
    }

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
        try {
          setLoading(true);

          if(!form.productPic || !form.name || !form.price || !form.stock || 
             !form.products || !form.categoryName || !form.description) {
            setError("Please fill in all fields."); return; }

          const formdata= new FormData();
          formdata.append("Name", form.name);
          formdata.append("Price", form.price);
          formdata.append("Stock", form.stock);
          formdata.append("Products", form.products);
          formdata.append("CategoryName", form.categoryName);
          formdata.append("Description", form.description);
          if(form.productPic) {formdata.append("ProductPic", form.productPic);}

          const response = await axios.post(import.meta.env.VITE_PRODUCT_ADD, formdata, {
            headers: { "Content-Type": "multipart/form-data" },});
          setForm(response.data.data);          
          setSuccess("Product added successfully!");
        } 
        catch (error) { setError("Failed to add product.");}
        finally { setLoading(false); }
      };



// const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );
  

  return (<>
    <section className="mx-5 mt-5">
      
      {/* Serach Bar */}
      <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."/>
      
      
       {/* No products found. */}
        {/* <span>
          {filteredProducts.length === 0 && <p className="text-white/50">No products found.</p>}
        </span> */}

{/* Form */}
<div className="shadow-2xl shadow-white p-8 rounded-md w-full">
  <PageHeader text={"Add Product"} />
  <form className="flex flex-col gap-4" onSubmit={handleAddProduct}>
    {/* Product Image*/}
    <div className="flex justify-center">
      <label className="w-24 h-24 rounded-full overflow-hidden flex justify-center cursor-pointer">
        <img src={previewImage} />
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
        <option value="" disabled selected className="text-black font-semibold">Select Products</option>
        <option value="FeatureProducts" className="text-black font-semibold">FeatureProducts</option>
        <option value="SimpleProducts" className="text-black font-semibold">SimpleProducts</option>
      </select>

      <select name="categoryName" className="flex-1 rounded-full px-3 py-2 bg-white/5 text-hover-bg" 
      value={form.categoryName} onChange={handleInputChange}>
        <option value="" disabled selected className="text-black font-semibold">Select Categories</option>
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

    {/* Row 4 - Button right aligned */}
    <div className="flex justify-end">
      <Button text="Add Product" type="submit" />
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


    </section>
 </> );
};
