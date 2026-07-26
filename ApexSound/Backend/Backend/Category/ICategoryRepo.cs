using Backend.Administration;
using Backend.Models;

namespace Backend.Category
{
    public interface ICategoryRepo
    {
        Task<List<CategoryModelDTO>> ListCategory();
        Task<CategoryModelDTO> AddCategory(CategoryModelDTO addcategory);
        Task<CategoryModelDTO> UpdateCategory(int Id, CategoryModelDTO updatecategory);
        Task<bool> DeleteCategory(int Id);
        Task<int> CategoryCount();
    }
}
