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
        
        [HttpPost]
        [Route("registeration")]
        public async Task<IActionResult> userRegisteration([FromBody] UserRegDTO userregDTO)
        {
            try
            {
                var Reg = await _userRepo.userRegisteration(userregDTO);
                if (Reg == null)
                {
                    return BadRequest(new { message = "User Registeration Failed",data = Reg });   
                }
                return Ok(new {message = "User Registeration Successfully", data = Reg });
            }
            catch (Exception ex) {
            
                return BadRequest(new { error = ex.Message});
            }
        }

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
        
        [HttpPut("update/{Id}")]
        public async Task<IActionResult> userProfile(int Id, [FromForm] UserProDTO userproDTO)
        {
            try
            {
                var Pro = await _userRepo.userProfile(Id ,userproDTO);
                if (Pro == null)
                {
                    return BadRequest(new { message = "User Profile Updated Failed"});
                }
                return Ok(new { message = "User Profile Updated", data = Pro });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

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


    }
}
