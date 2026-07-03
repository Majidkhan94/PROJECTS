using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Administration
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepo _adminRepo;
        public AdminController(IAdminRepo adminRepo)
        {
            this._adminRepo = adminRepo;
        }

        [HttpPost("registeration")]
        public async Task<IActionResult> AdminRegisteration([FromBody] AdminRegDTO adminregisteration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var AdminData = await _adminRepo.AdminRegisteration(adminregisteration);
                if (AdminData == null)
                {
                    return BadRequest(new { message = "Admin Registeration Failed" });
                }
                return Ok(new { message = "Admin Registeration Successfully", Details = AdminData });
            }
            catch (Exception ex)
            {
               return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> AdminLogin([FromBody] AdminLogDTO adminlogin)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var Admin = await _adminRepo.AdminLogin(adminlogin);
                if(Admin == null)
                {
                    return BadRequest(new { message = "Admin Login Failed" });
                }
                return Ok(new { message = "Admin Login Successfully", Details = Admin });
            }
            catch (Exception ex) {return BadRequest(new { message = ex.Message }); }
        }





    }
}