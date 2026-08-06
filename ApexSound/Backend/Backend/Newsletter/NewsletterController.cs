using Microsoft.AspNetCore.Mvc;
using Backend.Controller;

namespace Backend.Newsletter
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterController : BaseController
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
            return await TryCatch(async () => {
                var add = await _newsletterRepo.AddNewsletter(addnewsletter);
                return add;
            }, "NewsLetter Added Successfully");
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteNewsletter(int Id)
            {
            return await TryCatch(async () =>{
                var Delete = await _newsletterRepo.DeleteNewsletter(Id);
                return Delete;
            }, "NewsLetter Deleted Successfully");

            }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListNewsletter()
        {
            return await TryCatch(async () =>{
                var list = await _newsletterRepo.ListNewsletter();
                return list;
            }, "");
            

        }
        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> NewsletterCount()
        {
            return await TryCatch(async () =>
            {
                var count = await _newsletterRepo.NewsletterCount();
                return count;
            }, "");
            
        }



    }
}
