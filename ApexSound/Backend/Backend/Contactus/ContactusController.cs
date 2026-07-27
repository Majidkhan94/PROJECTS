using Backend.ConnectionStrings;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Contactus
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactusController : ControllerBase
    {
        private readonly IContactusRepo _contactus;
        public ContactusController(IContactusRepo iContactusrepo)
        {
            _contactus = iContactusrepo;
        }

        // list
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> Contactlist()
        {
            try {
                var list = await _contactus.Contactlist();
                return Ok(new { data = list });
            }
            catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
            
        }

        // ADD
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Contactadd([FromBody] ContactusModel contactadd)
        {
            try {
                var add = await _contactus.Contactadd(contactadd);
                
                if (add == null) return BadRequest(new { message = "Message not sent" });
                return Ok(new {message = "Message sent successfully"});
            }
            catch(Exception ex) { return BadRequest(new { error = ex.Message }); }
        }

        // DELETE
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> Contactdelete(int Id)
        {
            try
            {
                var delete = await _contactus.Contactdelete(Id);

                if (delete == null) return BadRequest(new { message = "Not deleted" });
                return Ok(new { message = "Deleted!!!" });
            }
            catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
        }

        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> ContactCount()
        {
            try
            {
                var count = await _contactus.ContactCount();
                return Ok(new { data = count });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
