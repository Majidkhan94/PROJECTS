using Backend.ConnectionStrings;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Products
{
    public class ProductRepo : IProductRepo
    {
        private readonly ConnectionString _connectionString;
        private readonly ICloudinary _cloudinary;
        public ProductRepo(ConnectionString connectionString, ICloudinary cloudinary)
        {
            _connectionString = connectionString;
            _cloudinary = cloudinary;
        }

        // Count
        public async Task<int> ProductCount()
        {
            return await _connectionString.Products.CountAsync();
        }

        // List
        public async Task<List<ProductModelDTO>> ListProduct()
        {
            return await _connectionString.Products
                   .Include(p => p.Category)
                   .Select(s => new ProductModelDTO
                   {
                       Id = s.Id,
                       Name = s.Name,
                       Slug = s.Slug,
                       Description = s.Description,
                       Price = s.Price,
                       Stock = s.Stock,
                       ProductPicURL = s.ProductPicURL,
                       CategoryId = s.CategoryId,
                       CategoryName = s.CategoryName,
                   })
                   .ToListAsync();
        }

        // Add
        public async Task<ProductModelDTO> AddProduct(ProductModelDTO addproduct)
        {
            // Check Name
            if (string.IsNullOrWhiteSpace(addproduct.Name)) throw new Exception("Product name required");

            // Slug
            var slug = addproduct.Name.ToLower().Replace(" ", "-");

            // Exist Product
            var ExistProduct = await _connectionString.Products.FirstOrDefaultAsync(p => p.Slug == slug);
            if (ExistProduct != null) throw new Exception("Product already exists.");

            // Image Upload
            string? productpicurl = addproduct.ProductPicURL;
            if(addproduct.ProductPic != null)
            {
                productpicurl = await _cloudinary.UploadImage(addproduct.ProductPic, "ProductsImage");
            }

            var adddata = new ProductModel
            {
                Name = addproduct.Name,
                Slug = slug,
                Description = addproduct.Description,
                Price = addproduct.Price,
                Stock = addproduct.Stock,
                IsActive = addproduct.IsActive,
                ProductPicURL = productpicurl,
                Createdat = DateTime.UtcNow,
                CategoryId = addproduct.CategoryId,
                CategoryName = addproduct.CategoryName,
                products = (ProductModel.Products)addproduct.products
            };

                await _connectionString.Products.AddAsync(adddata);
                await _connectionString.SaveChangesAsync();

            return new ProductModelDTO
            {
                Id = adddata.Id,
                Name = adddata.Name,
                Slug = slug,
                Description = adddata.Description,
                Price= adddata.Price,
                Stock = adddata.Stock,
                IsActive = adddata.IsActive,
                ProductPicURL = productpicurl,
                Createdat = adddata.Createdat,
                CategoryId = adddata.CategoryId,
                CategoryName = adddata.CategoryName,
                products = (ProductModelDTO.Products)adddata.products

            };


        }




        public Task<ProductModelDTO> DeleteProduct(int Id)
        {
            throw new NotImplementedException();
        }





        public Task<ProductModelDTO> UpdateProduct(int Id, ProductModelDTO updateproduct)
        {
            throw new NotImplementedException();
        }
    }
}
