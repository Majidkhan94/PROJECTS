    using Microsoft.AspNetCore.Authorization;
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
                if (!ModelState.IsValid) return BadRequest(ModelState);
                try
                {
                    var Adminlogin = await _adminRepo.AdminLogin(adminlogin);
                    if (Adminlogin == null)
                    {
                        return BadRequest(new { message = "Admin Login Failed" });
                    }
                    return Ok(new { message = "Admin Login Successfully", Details = Adminlogin });
                }
                catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
            }

            [Authorize]
            [HttpPut("update")]
            public async Task<IActionResult> AdminUpdate([FromForm] AdminUpdateDTO adminupdate)
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                try
                {
                    var idClaim = User.FindFirst("Id")?.Value;
                    if (idClaim == null) return Unauthorized(new { message = "Invalid token" });
                    int Id = int.Parse(idClaim);

                 await _adminRepo.AdminUpdate(Id, adminupdate);
                    return Ok(new { message = "Admin Updated Successfully" });
                }
                catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
            }

            [Authorize]
            [HttpGet("profile")]
            public async Task<IActionResult> AdminProfile()
            {
                try
                {
                    var idClaim = User.FindFirst("Id")?.Value;
                    if (idClaim == null) return Unauthorized(new { message = "Invalid token" });
                    int Id = int.Parse(idClaim);

                    var profile = await _adminRepo.AdminProfile(Id);
                    return Ok(profile);
                }
                catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
            }

    }
    }