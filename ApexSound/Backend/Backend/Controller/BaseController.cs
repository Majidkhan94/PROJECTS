using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    public class BaseController : ControllerBase
    {
        protected async Task<IActionResult> TryCatch(Func<Task<object>> action, string successMessage = "Write Here Your Success Message")
        {
            try
            {
                var result = await action();
                return Ok(new { message = successMessage, data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
