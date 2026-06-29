using Backend.Administration;
using Backend.Models;
namespace Backend.Administration
{
    public interface IAdminRepo
    {
        Task<AdminModelDTO> AdminRegisteration(AdminModelDTO adminregisteration);
        Task<AdminModelDTO> AdminLogin(AdminModelDTO adminlogin);
        Task<AuthModel> Refreshtoken(AuthModel authmodel);
    }
}
