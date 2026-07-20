using Microsoft.AspNetCore.Mvc;

namespace Backend.Users
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
