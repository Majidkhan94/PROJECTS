using Backend.Models;
using Backend.ConnectionStrings;
using Microsoft.EntityFrameworkCore;
using System;

namespace Backend.Category
{
    public class CategoryRepo : ICategoryRepo
    {
        private readonly ConnectionString _connectionstring;
        public CategoryRepo(ConnectionString connectionstring)
        {
            _connectionstring = connectionstring;
        }

        // List OF Categories

        public async Task<List<CategoryModelDTO>> ListCategory()
        {
            var list = await _connectionstring.Categories.Where(c=>c.IsActive).OrderBy(c=>c.Name)
                .Select(c => new CategoryModelDTO
                {
                    Id = c.Id, Name = c.Name, Slug = c.Slug,
                } ).ToListAsync();
            
            return list;
        }

        // Add Categories

        public async Task<CategoryModelDTO> AddCategory(CategoryModelDTO addcategory)
        {
            var AddData = new CategoryModel
            {
                Name = addcategory.Name,
                Slug = addcategory.Name.ToLower().Replace(" ", "-"),
                IsActive = true
            };

            await _connectionstring.Categories.AddAsync(AddData);
            await _connectionstring.SaveChangesAsync();

            return new CategoryModelDTO
            {
                Id = AddData.Id,
                Name = AddData.Name,
                Slug = AddData.Slug
            };


        }

        // Update Categories
        public async Task<CategoryModelDTO> UpdateCategory(int Id, CategoryModelDTO updatecategory)
        {
            var Category = await _connectionstring.Categories.FindAsync(Id);
            if (Category == null) throw new Exception("Category not found");

            Category.Name = updatecategory.Name;
            Category.Slug = updatecategory.Name.ToLower().Replace(" ", "-");

            await _connectionstring.SaveChangesAsync();
            return new CategoryModelDTO
            {
                Id = Category.Id,
                Name = Category.Name,
                Slug = Category.Slug,
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
