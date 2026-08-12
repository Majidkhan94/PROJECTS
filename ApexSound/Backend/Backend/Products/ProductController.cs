using Backend.Controller;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Products
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductController : BaseController
    {
        private readonly IProductRepo _productrepo;
        public ProductController(IProductRepo productrepo)
        {
            _productrepo = productrepo;
        }
        // Count
        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> ProductCount()
        {
            return await TryCatch(async () =>
            {
                var count = await _productrepo.ProductCount();
                return count;
            }, "");
        }
        // List
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListProduct(string? product, int? userId)
        {
            return await TryCatch(async () =>
            {
                var list = await _productrepo.ListProduct(product, userId);
                return list;
            }, "");
        }
        // Add
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddProduct([FromForm] ProductModelDTO addproduct)
        {
            return await TryCatch(async () =>
            {
                var add = await _productrepo.AddProduct(addproduct);
                return add;
            }, "Product Added Successfully");
        }
        // Update
        [HttpPut]
        [Route("update/{Id}")]
        public async Task<IActionResult> UpdateProduct(int Id, [FromForm] ProductModelDTO updateproduct)
        {
            return await TryCatch(async () =>
            {
                var update = await _productrepo.UpdateProduct(Id, updateproduct);
                return update;
            }, "Product Updated Successfully");
        }
        // Delete
        [HttpDelete]
        [Route("delete/{Id}")]
        public async Task<IActionResult> DeleteProduct(int Id, int? userId)
        {
            return await TryCatch(async () =>
            {
                var delete = await _productrepo.DeleteProduct(Id, userId);
                return delete;
            }, "Product Deleted Successfully");
        }
    }
}