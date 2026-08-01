using Microsoft.AspNetCore.Mvc;

namespace Backend.Products
{
    public interface IProductRepo
    {
        Task<List<ProductModelDTO>> ListProduct(string? product);
        Task<ProductModelDTO> AddProduct(ProductModelDTO addproduct);
        Task<ProductModelDTO> UpdateProduct(int Id, ProductModelDTO updateproduct);
        Task<ProductModelDTO> DeleteProduct(int Id);
        Task<int> ProductCount();
    }
}
