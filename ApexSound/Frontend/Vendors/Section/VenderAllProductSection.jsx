import { FaBox, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

import { Button, Searchbar, Input, Heading, PageHeader, Paragraph } from "../../Export.js";
import { ProductsList, ProductsDelete } from "../../APIs/ProductAPIs.js";

export const VenderAllProductSection = () => {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Listing Products
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("UserId");
      const response = await ProductsList(null, userId);
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

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const userId = localStorage.getItem("UserId");
      const response = await ProductsDelete(productId, userId);

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
  <PageHeader text="All Products" />
    <section className="mx-5 mt-5">

      {/* Search Bar */}
      <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />

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

      {/* List of Products */}
      <div className="mx-5 mt-5">
        

        {/* Product Cards */}
        <div className="flex flex-col md:flex-row flex-wrap gap-5 mt-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-background-color rounded-2xl p-6 w-full md:w-[calc(33.333%-1.34rem)]">

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

              {/* Delete button */}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => handleDeleteProduct(product.id)}
                  text={"Delete"}
                  className={"flex-1 hover:bg-button-redhover text-sm!"}
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