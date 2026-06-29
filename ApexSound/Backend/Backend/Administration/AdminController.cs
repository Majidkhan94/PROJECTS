using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> AdminRegisteration([FromBody] AdminModelDTO adminregisteration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var AdminData = await _adminRepo.AdminRegisteration(adminregisteration);
                if (AdminData == null)
                {
                    return BadRequest(new { message = "Admin Registeration Failed" });
                }
                return Ok(new { message = "Admin Registeration Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }




        }
    }
}