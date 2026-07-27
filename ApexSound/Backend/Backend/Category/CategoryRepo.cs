using Backend.Models;
using Backend.ConnectionStrings;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using System;

namespace Backend.Category
{
    public class CategoryRepo : ICategoryRepo
    {
        private readonly ConnectionString _connectionstring;
        private readonly ICloudinary _cloudinary; 
        public CategoryRepo(ConnectionString connectionstring, ICloudinary cloudinary)
        {
            _connectionstring = connectionstring;
            _cloudinary = cloudinary;
        }

        // List OF Categories

        public async Task<List<CategoryModelDTO>> ListCategory()
        {
            var list = await _connectionstring.Categories
            .Select( c => new CategoryModelDTO
            {
                    Id = c.Id,
                    Name = c.Name,
                    Slug = c.Slug,
                    ProfilePicURL = c.ProfilePicURL,
            })
            .ToListAsync();
            
            return list;
        }

        // Add Categories

        public async Task<CategoryModelDTO> AddCategory(CategoryModelDTO addcategory)
        {
            // Category Required
            if (string.IsNullOrWhiteSpace(addcategory.Name))
                throw new ArgumentException("Category name is required.");

            // Slug pehle banao, check bhi isi se karo
            var slug = addcategory.Name.ToLower().Replace(" ", "-");

            // Exist category
            var existCategory = await _connectionstring.Categories.FirstOrDefaultAsync(c => c.Slug == slug);
            if (existCategory != null) throw new Exception("Category already exists.");

            // Image upload
            string? profilePicUrl = addcategory.ProfilePicURL;
            if(addcategory.ProfilePic != null)
            {
            try{ profilePicUrl = await _cloudinary.UploadImage(addcategory.ProfilePic, "CategoryImage"); }
            catch (Exception ex){throw new Exception("Image upload Failed.", ex);}
            }

            var addData = new CategoryModel
            {
                Name = addcategory.Name,
                Slug = slug,
                IsActive = true,
                ProfilePicURL = profilePicUrl,
                Createdat = DateTime.UtcNow
            };


            await _connectionstring.Categories.AddAsync(addData);
            await _connectionstring.SaveChangesAsync();

            return new CategoryModelDTO
            {
                Id = addData.Id,
                Name = addData.Name,
                Slug = addData.Slug
            };
        }

        // Update Categories
        public async Task<CategoryModelDTO> UpdateCategory(int Id, CategoryModelDTO updatecategory)
        {
            // Find by Id
            var Category = await _connectionstring.Categories.FindAsync(Id);
            if (Category == null) throw new Exception("Category not found");

            // Name Required
            if (string.IsNullOrWhiteSpace(updatecategory.Name))throw new Exception("Category name is required.");

            // Slug
            var slug = updatecategory.Name.ToLower().Replace(" ", "-");

            // Exist category
            var existCategory = await _connectionstring.Categories.FirstOrDefaultAsync(c => c.Slug == slug);
            if (existCategory != null) throw new Exception("Category already exists.");

            Category.Name = updatecategory.Name;
            Category.Slug = slug;

            // Image
            if (updatecategory.ProfilePic != null)
            {
                try
                {
                    var uploadedUrl = await _cloudinary.UploadImage(updatecategory.ProfilePic, "CategoryImage");
                    Category.ProfilePicURL = uploadedUrl;
                }
                catch (Exception ex)
                {
                    throw new Exception("Image upload Failed.", ex);
                }
            }

            await _connectionstring.SaveChangesAsync();
            return new CategoryModelDTO
            {
                Id = Category.Id,
                Name = Category.Name,
                Slug = Category.Slug,
                ProfilePicURL = Category.ProfilePicURL,
            };

        }

        // Delete Categories
        public async Task<bool> DeleteCategory(int Id)
        {
            var Category = await _connectionstring.Categories.FindAsync(Id);
            if (Category == null) throw new Exception("Category not found");

            _connectionstring.Categories.Remove(Category);
            await _connectionstring.SaveChangesAsync();
            
            return true;
        }

        // Count
        public async Task<int> CategoryCount()
        {
            return await _connectionstring.Categories.CountAsync();
        }
    }
}
