using Backend.ConnectionStrings;
using Backend.Controller;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Contactus
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactusController : BaseController
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
            return await TryCatch( async () =>{
                var list = await _contactus.Contactlist();
                return list;
            }, "");
  
        }

        // ADD
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Contactadd([FromBody] ContactusModel contactadd)
        {
            return await TryCatch(async () =>
            {
                var add = await _contactus.Contactadd(contactadd);
                return add;
            }, "Message has been sent");
        }

        // DELETE
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> Contactdelete(int Id)
        {
            return await TryCatch( async () =>
            {
                var delete = await _contactus.Contactdelete(Id);
                return delete;
            },"Contact deleted");
        }

        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> ContactCount()
        {
            return await TryCatch(async() => {
                var count = await _contactus.ContactCount();
                return count;
            }, "");
        }
    }
}
