using ApexSound_BackEnd.Models;

namespace ApexSound_BackEnd.Administration
{
    public interface IAdminRepo
    {
        Task<AuthModel> AdminRegisteration(AdminRegisteration AdminRegisteration);
        Task<AuthModel> AdminLogin(AdminLogin AdminLogin);
        Task<AuthModel> Adminprofileupdate(Adminprofileupdate Adminprofileupdate);
        Task<AuthModel> RefreshToken(int Id, string refreshtoken, DateTime? refreshtokenexpiry);

    }
}
