import { useState, useEffect } from "react";
import { Button, Searchbar, PageHeader, Paragraph } from "../../Export.js";
import { ProductsList, ProductsDelete } from "../../APIs/ProductAPIs.js";

export const AdminAllProductSection = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductsList();
      if (response.success) {
        setProducts(response?.data?.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = (products || []).filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-5 mt-5">
      <PageHeader text="All Products" />

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {success && <p className="text-green-500 text-center mt-2">{success}</p>}

      <div className="mt-4">
        <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-5 mt-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-background-color rounded-2xl p-6 w-full md:w-[calc(33.333%-1.34rem)]">
            <div className="pb-4 mb-5 border-b border-hover-bg">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={product.productPicURL}
                  alt={product.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex flex-col items-center text-lg font-semibold">
                  <span>{product.name}</span>
                  <span className="text-xs text-white/60">{`[ ${product.products} ]`}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Paragraph text={`Price: ${product.price}`} />
              <Paragraph text={`Stock: ${product.stock}`} />
              <Paragraph text={`Category: ${product.categoryName}`} />
              <Paragraph text={`Description: ${product.description}`} />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  // Yahan aap update logic ya navigation add kar sakte hain
                }}
                text={"Update"}
                className={"flex-1 text-sm!"}
              />
              <Button
                onClick={() => handleDeleteProduct(product.id)}
                text={"Delete"}
                className={"flex-1 hover:bg-red-600! hover:text-white! text-sm!"}
              />
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <p className="text-red-500 text-center mt-6">No products found.</p>
      )}
    </div>
  );
};