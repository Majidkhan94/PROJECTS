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

            // Registeration

        [HttpPost("registeration")]
        public async Task<IActionResult> AdminRegisteration([FromBody] AdminRegDTO adminregisteration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var Adminreg = await _adminRepo.AdminRegisteration(adminregisteration);
                if (Adminreg == null)
                {
                    return BadRequest(new { message = "Admin Registeration Failed" });
                }
                return Ok(new { message = "Admin Registeration Successfully", Details = Adminreg });
            }
            catch (Exception ex)
            {
               return BadRequest(new { message = ex.Message });
            }
        }

            // Login

        [HttpPost("login")]
        public async Task<IActionResult> AdminLogin([FromBody] AdminLogDTO adminlogin)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var Adminlogin = await _adminRepo.AdminLogin(adminlogin);
                if(adminlogin == null)
                {
                    return BadRequest(new { message = "Admin Login Failed" });
                }
                return Ok(new { message = "Admin Login Successfully", Details = Adminlogin });
            }
            catch (Exception ex) {return BadRequest(new { message = ex.Message }); }
        }

        // Update

        [HttpPost("update/{Id}")]
        public async Task<IActionResult> AdminUpdate(int Id, [FromForm] AdminUpdateDTO adminupdate)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                await _adminRepo.AdminUpdate(Id, adminupdate);
                return Ok(new { message = "Admin Updated Successfully" });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }

        // Get in Dashbord
        [HttpGet("profile/{Id}")]
        public async Task<IActionResult> AdminProfile(int Id)
        {
            try
            {
                var profile = await _adminRepo.AdminProfile(Id);
                return Ok(profile);
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }



    }
}