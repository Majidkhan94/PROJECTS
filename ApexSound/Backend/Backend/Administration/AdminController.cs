using Backend.Controller;
using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    namespace Backend.Administration
    {
        [ApiController]
        [Route("/api/[controller]")]
        public class AdminController : BaseController
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
            return await TryCatch(async () =>
            {
                var Register = await _adminRepo.AdminRegisteration(adminregisteration);
                return Register;
            }, "Admin Registeration Successfully");
            }

            // Login
            [HttpPost("login")]
            public async Task<IActionResult> AdminLogin([FromBody] AdminLogDTO adminlogin)
            {

                    return await TryCatch(async () =>
                    {
                        var login = await _adminRepo.AdminLogin(adminlogin);
                        if(login == null)
                        {
                            throw new Exception("Invalid credentials or access denied.");
                        }
                        return login;
                    }, "Admin Login Successfully");
            }

        [HttpPut("update/{Id}")]
        public async Task<IActionResult> AdminUpdate(int Id, [FromForm] AdminUpdateDTO adminupdate)
        {

            return await TryCatch(async () =>
            {
                var Update = await _adminRepo.AdminUpdate(Id,adminupdate);
                return Update;
            }, "Admin Update Successfully");
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> AdminProfile(int Id)
        {

            return await TryCatch(async () =>
            {
                var Profile = await _adminRepo.AdminProfile(Id);
                return Profile;
            }, "");
        }

    }
    }