using Microsoft.AspNetCore.Mvc;

namespace Backend.Products
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductController : ControllerBase
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
            try
            {
                await _productrepo.ProductCount();
                return Ok(new { message = "Product add successfully" });
            }
            catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
        }

        // List
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListProduct()
        {
            try
            {
                await _productrepo.ListProduct();
                return Ok(new { message = "Product add successfully" });
            }
            catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
        }


        // Add
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddProduct(ProductModelDTO addproduct)
        {
            try 
            {
                    await _productrepo.AddProduct(addproduct);
                    return Ok(new { message = "Product add successfully"});
            }
            catch(Exception ex) { return BadRequest(new { error = ex.Message });}   
        }

    }
}
