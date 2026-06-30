using Backend.Administration;
using Backend.Models;
namespace Backend.Administration
{
    public interface IAdminRepo
    {
        Task<AdminRegDTO> AdminRegisteration(AdminRegDTO adminregisteration);
        Task<AdminLogDTO> AdminLogin(AdminLogDTO adminlogin);
        
    }
}
