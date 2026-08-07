using Microsoft.AspNetCore.Mvc;
using Backend.Category;
using Backend.Controller;

namespace Backend.Category
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : BaseController
    {
        private readonly ICategoryRepo _categoryRepo;
        public CategoryController(ICategoryRepo categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        // ADD
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddCategory([FromForm] CategoryModelDTO addcategory)
        {
            return await TryCatch(async () => 
            {
                var Add = await _categoryRepo.AddCategory(addcategory);
                return Add;
            }, "Categories Added");
        }

        // Update
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCategory(int Id, [FromForm] CategoryModelDTO updatecategory)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var update = await _categoryRepo.UpdateCategory(Id, updatecategory);

                if (update == null)
                {
                    return BadRequest(new { message = "Category not updated" });
                }

                return Ok(new { message = "Category updated successfully", data = update });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
            
        // Delete
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCategory(int Id)
        {
            try
            {
                var delete = await _categoryRepo.DeleteCategory(Id);

                if (delete == null)
                {
                    return BadRequest(new { message = "Category not deleted" });
                }

                return Ok(new { message = "Category deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Category not found", error = ex.Message });
            }
        }

        // List Categories
        [HttpGet]
        [Route("list")]

        public async Task<IActionResult> ListCategory()
        {
            return await TryCatch(async () => {
                var category = await _categoryRepo.ListCategory();
                return category;
            }, "");
        }

        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> CategoryCount()
        {
            return await TryCatch(async () => {
                var count = await _categoryRepo.CategoryCount();
                return count;
            }, "");
            
        }

    }

    }

