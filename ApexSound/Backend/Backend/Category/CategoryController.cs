using Microsoft.AspNetCore.Mvc;
using Backend.Category;

namespace Backend.Category
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
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
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var Add = await _categoryRepo.AddCategory(addcategory);
                if (Add == null) 
                {
                    return BadRequest(new { message = "Category not added"});                 
                }
                return Ok(new { message = "Category Add Successfully", data = Add });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
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
            var category = await _categoryRepo.ListCategory();
            return Ok(category);
        }

        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> CategoryCount()
        {
            try
            {
                var count = await _categoryRepo.CategoryCount();
                return Ok(new { data = count });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    }

    }

