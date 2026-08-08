using Microsoft.AspNetCore.Mvc;
using Backend.Controller;
namespace Backend.Users
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : BaseController
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
            return await TryCatch(async() => {
                var Registeration = await _userRepo.userRegisteration(userregDTO);
                return Registeration;
            }, "User Registeration Successfully");
            
        }

        // Login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> userLogin([FromBody] UserLogDTO userlogDTO)
        {
            return await TryCatch(async () => {
                var login = await _userRepo.userLogin(userlogDTO);
                return login;
            }, "User Login Successfully");

        }

        // Update Profile
        [HttpPut("update/{Id}")]
        public async Task<IActionResult> userProfile(int Id, [FromForm] UserProDTO userproDTO)
        {
            return await TryCatch(async () => {
                var Update = await _userRepo.userProfile(Id, userproDTO);
                return Update;
            }, "User Profile Updated");
           
        }

        // Delete
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> userDelete(int Id)
        {
            return await TryCatch(async () => {
                var Delete = await _userRepo.userDelete(Id);
                return Delete;
            }, "User Deleted");
        }

        // Get User Profile Data
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetUserProfile(int Id)
        {
            return await TryCatch(async () => {
                var user = await _userRepo.GetUserProfile(Id);
                return user;
            }, "");
        }


        // List of Users
        [HttpGet]
        [Route("userlist")]
        public async Task<IActionResult> userlist()
        {
            return await TryCatch(async () => {
                var list = await _userRepo.GetUserList();
                return list;
            }, "");
            
        }


        // Count of Users
        [HttpGet]
        [Route("usercount")]
        public async Task<IActionResult> usercount()
        {
            return await TryCatch(async () => {
                var count = await _userRepo.GetUserCount();
                return count;
            }, "");
            
        }
    }
}

