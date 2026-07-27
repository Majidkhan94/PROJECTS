using Microsoft.AspNetCore.Mvc;

namespace Backend.Newsletter
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterRepo _newsletterRepo;
        public NewsletterController(INewsletterRepo newsletterRepo)
        {
            _newsletterRepo = newsletterRepo;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddNewsletter([FromBody] NewsletterModel addnewsletter)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var add = await _newsletterRepo.AddNewsletter(addnewsletter);
                if (add == null)
                {
                    return BadRequest(new { message = "Newsletter Not Added"});
                }
                return Ok(new { message = "Newsletter Added", data = add });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteNewsletter(int Id)
            {
            try
            {
                var Delete = await _newsletterRepo.DeleteNewsletter(Id);
                if (Delete == null)
                {
                    return BadRequest(new { message = "Newsletter Not Deleted", data = Delete });
                }
                return Ok(new { message = "Newsletter Deleted", data = Delete });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong", data = ex.Message });
            }

            }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListNewsletter()
        {
            try
            {
                var list = await _newsletterRepo.ListNewsletter();
                if (list == null)
                {
                    return BadRequest(new { message = "List Not Found"});
                }
                return Ok(new { message = "List Found", data = list });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong", data = ex.Message });
            }

        }
        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> NewsletterCount()
        {
            try {
                var count = await _newsletterRepo.NewsletterCount();
                return Ok(new { data = count });
            }
            catch (Exception ex) {
                return BadRequest(new { error = ex.Message });
            }
        }



    }
}
