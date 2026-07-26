using Microsoft.AspNetCore.Mvc;

namespace Backend.Users
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        public UserController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        // Registeration
        [HttpPost]
        [Route("registeration")]
        public async Task<IActionResult> userRegisteration([FromBody] UserRegDTO userregDTO)
        {
            try
            {
                var Reg = await _userRepo.userRegisteration(userregDTO);
                if (Reg == null)
                {
                    return BadRequest(new { message = "User Registeration Failed", data = Reg });
                }
                return Ok(new { message = "User Registeration Successfully", data = Reg });
            }
            catch (Exception ex) {

                return BadRequest(new { error = ex.Message });
            }
        }

        // Login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> userLogin([FromBody] UserLogDTO userlogDTO)
        {
            try
            {
                var log = await _userRepo.userLogin(userlogDTO);
                if (log == null)
                {
                    return BadRequest(new { message = "User Login Failed", data = log });
                }
                return Ok(new { message = "User Login Successfully", data = log });
            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });
            }

        }

        // Update Profile
        [HttpPut("update/{Id}")]
        public async Task<IActionResult> userProfile(int Id, [FromForm] UserProDTO userproDTO)
        {
            try
            {
                var Pro = await _userRepo.userProfile(Id, userproDTO);
                if (Pro == null)
                {
                    return BadRequest(new { message = "User Profile Updated Failed" });
                }
                return Ok(new { message = "User Profile Updated", data = Pro });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Delete
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> userDelete(int Id)
        {
            try
            {
                var Delete = await _userRepo.userDelete(Id);
                if (!Delete) 
                {
                    return BadRequest(new { message = "User Not Deleted" });
                }
                return Ok(new { message = "User Deleted"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }

        // Get User Profile Data
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetUserProfile(int Id)
        {
            try
            {
                var user = await _userRepo.GetUserProfile(Id);
                return Ok(new { data = user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        // List of Users
        [HttpGet]
        [Route("userlist")]
        public async Task<IActionResult> userlist()
        {
            try
            {
                var list = await _userRepo.GetUserList();
                return Ok(new { data = list });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        // Count of Users
        [HttpGet]
        [Route("usercount")]
        public async Task<IActionResult> usercount()
        {
            try
            {
                var count = await _userRepo.GetUserCount();
                return Ok(new { data = count });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}

