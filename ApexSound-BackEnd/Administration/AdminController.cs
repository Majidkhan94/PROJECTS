using ApexSound_BackEnd.Administration;
using ApexSound_BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
namespace ApexSound_BackEnd.Administration
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepo _adminRepo;

        public AdminController(IAdminRepo repo)
        {
            _adminRepo = repo;
        }

        // Registeration
        [HttpPost("registeration")]
        public async Task<IActionResult> AdminRegisteration(AdminRegisteration AdminRegisteration)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            try
            {
                var Admindata = await _adminRepo.AdminRegisteration(AdminRegisteration);
                if (Admindata != null)
                {
                    return Ok(new { message = "Admin Registeration Successfully", data = Admindata });
                }
                return BadRequest(new { message = "Admin Registeration Failed" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message});

            }
            
        }
        [HttpPost("login")]
        public async Task<IActionResult> AdminLogin(AdminLogin AdminLogin)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var Userlogin = await _adminRepo.AdminLogin(AdminLogin);
                if(Userlogin != null)
                {
                    return Ok(new { message = "login Successfully", data = Userlogin });
                }
                return BadRequest(new { message = "login Failed" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }




        }


















    }
}
