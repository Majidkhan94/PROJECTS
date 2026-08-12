using Backend.ConnectionStrings;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
        public async Task<List<ProductModelDTO>> ListProduct(string? product, int? userId = null)
        {
            var list = _connectionString.Products
                       .Include(C => C.Category)
                       .AsQueryable();

            if (!string.IsNullOrWhiteSpace(product))
            {
                list = list.Where(C => C.Category != null && C.Category.Slug.ToLower() == product.ToLower());
            }

            // Agar userId diya gaya hai (Vendor apne products dekhna chahta hai) to filter lagao
            if (userId != null)
            {
                list = list.Where(p => p.UserId == userId);
            }

            var data = await list.ToListAsync();

            return data.Select(s => new ProductModelDTO
            {
                Id = s.Id,
                Name = s.Name,
                Slug = s.Slug,
                Description = s.Description,
                Price = s.Price.Value,
                Stock = s.Stock.Value,
                ProductPicURL = s.ProductPicURL,
                CategoryId = s.CategoryId,
                CategoryName = s.CategoryName,
                products = (ProductModelDTO.Products)s.products,
                IsActive = s.IsActive,
                Createdat = s.Createdat,
                UserId = s.UserId,
            })
                   .ToList();
        }

        // Add
        public async Task<ProductModelDTO> AddProduct(ProductModelDTO addproduct)
        {
            // Check Name
            if (addproduct.ProductPic == null ||
                string.IsNullOrWhiteSpace(addproduct.Name) ||
                addproduct.Price == null || addproduct.Price <= 0 ||
                addproduct.Stock == null || addproduct.Stock < 0 ||
                addproduct.products == null ||
                string.IsNullOrWhiteSpace(addproduct.CategoryName) ||
                string.IsNullOrWhiteSpace(addproduct.Description) ||
                addproduct.UserId == null)
            {
                throw new Exception("All fields are required");
            }

            // Slug
            var slug = addproduct.Name.ToLower().Replace(" ", "-");

            // Exist Product
            var ExistProduct = await _connectionString.Products.FirstOrDefaultAsync(p => p.Slug == slug);
            if (ExistProduct != null) throw new Exception("Product already exists.");

            // Image Upload
            string? productpicurl = addproduct.ProductPicURL;
            if (addproduct.ProductPic != null)
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
                products = (ProductModel.Products)addproduct.products,
                UserId = addproduct.UserId
            };

            await _connectionString.Products.AddAsync(adddata);
            await _connectionString.SaveChangesAsync();

            return new ProductModelDTO
            {
                Id = adddata.Id,
                Name = adddata.Name,
                Slug = slug,
                Description = adddata.Description,
                Price = adddata.Price.Value,
                Stock = adddata.Stock.Value,
                IsActive = adddata.IsActive,
                ProductPicURL = productpicurl,
                Createdat = adddata.Createdat,
                CategoryId = adddata.CategoryId,
                CategoryName = adddata.CategoryName,
                products = (ProductModelDTO.Products)adddata.products,
                UserId = adddata.UserId

            };


        }

        // Update
        public async Task<ProductModelDTO> UpdateProduct(int Id, ProductModelDTO updateproduct)
        {
            // Find Existing Product
            var existingProduct = await _connectionString.Products.FirstOrDefaultAsync(p => p.Id == Id);
            if (existingProduct == null) throw new Exception("Product not found");

            // Check Name
            if (string.IsNullOrWhiteSpace(updateproduct.Name) ||
                updateproduct.Price == null || updateproduct.Price <= 0 ||
                updateproduct.Stock == null || updateproduct.Stock < 0 ||
                updateproduct.products == null ||
                string.IsNullOrWhiteSpace(updateproduct.CategoryName) ||
                string.IsNullOrWhiteSpace(updateproduct.Description))
            {
                throw new Exception("All fields are required");
            }

            // Ownership Check - sirf apna hi product update kar sake
            if (updateproduct.UserId != null && existingProduct.UserId != updateproduct.UserId)
            {
                throw new Exception("You are not allowed to update this product");
            }

            // Slug
            var slug = updateproduct.Name.ToLower().Replace(" ", "-");

            // Exist Product (agar naam badla hai aur naya slug kisi doosre product se clash kar raha hai)
            var ExistProduct = await _connectionString.Products
                .FirstOrDefaultAsync(p => p.Slug == slug && p.Id != Id);
            if (ExistProduct != null) throw new Exception("Product already exists.");

            // Image Upload (sirf tab jab nayi image bheji ho, warna purani hi rahegi)
            string? productpicurl = existingProduct.ProductPicURL;
            if (updateproduct.ProductPic != null)
            {
                productpicurl = await _cloudinary.UploadImage(updateproduct.ProductPic, "ProductsImage");
            }

            // Update Fields
            existingProduct.Name = updateproduct.Name;
            existingProduct.Slug = slug;
            existingProduct.Description = updateproduct.Description;
            existingProduct.Price = updateproduct.Price;
            existingProduct.Stock = updateproduct.Stock;
            existingProduct.IsActive = updateproduct.IsActive;
            existingProduct.ProductPicURL = productpicurl;
            existingProduct.CategoryId = updateproduct.CategoryId;
            existingProduct.CategoryName = updateproduct.CategoryName;
            existingProduct.products = (ProductModel.Products)updateproduct.products;

            await _connectionString.SaveChangesAsync();

            return new ProductModelDTO
            {
                Id = existingProduct.Id,
                Name = existingProduct.Name,
                Slug = existingProduct.Slug,
                Description = existingProduct.Description,
                Price = existingProduct.Price.Value,
                Stock = existingProduct.Stock.Value,
                IsActive = existingProduct.IsActive,
                ProductPicURL = existingProduct.ProductPicURL,
                Createdat = existingProduct.Createdat,
                CategoryId = existingProduct.CategoryId,
                CategoryName = existingProduct.CategoryName,
                products = (ProductModelDTO.Products)existingProduct.products,
                UserId = existingProduct.UserId
            };
        }

        // Delete
        public async Task<bool> DeleteProduct(int Id, int? userId = null)
        {
            // Find Existing Product
            var existingProduct = await _connectionString.Products.FirstOrDefaultAsync(p => p.Id == Id);

            if (existingProduct != null)
            {
                // Ownership Check - sirf apna hi product delete kar sake
                if (userId != null && existingProduct.UserId != userId)
                {
                    throw new Exception("You are not allowed to delete this product");
                }

                _connectionString.Products.Remove(existingProduct);
                await _connectionString.SaveChangesAsync();
                return true;
            }
            return false;
        }

    }
}