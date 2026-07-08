using Backend.Administration;
using Backend.Models;
namespace Backend.Administration
{
    public interface IAdminRepo
    {
        Task<AdminRegDTO> AdminRegisteration(AdminRegDTO adminregisteration);
        Task<AdminLogDTO> AdminLogin(AdminLogDTO adminlogin);
        Task<AdminUpdateDTO> AdminUpdate(int Id, AdminUpdateDTO AdminUpdate);
        Task<AdminProfileDTO> AdminProfile(int Id);

    }
}
