using Backend.Migrations;
using Backend.Models;
using Backend.Users;
namespace Backend.Users
{
    public interface IUserRepo
    {
        Task<UserRegDTO> userRegisteration(UserRegDTO userregDTO);
        Task<UserLogDTO> userLogin(UserLogDTO userlogDTO);
        Task<UserProDTO> userProfile(int Id, UserProDTO userproDTO);
        Task<UserProDTO> GetUserProfile(int Id);
        Task<bool> userDelete(int Id);
        Task<List<AuthModel>> GetUserList();
        Task<int> GetUserCount();
    }
}
