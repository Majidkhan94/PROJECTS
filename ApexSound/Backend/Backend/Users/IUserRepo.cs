using Backend.Users;
namespace Backend.Users
{
    public interface IUserRepo
    {
        Task<UserRegDTO> userRegisteration(UserRegDTO userregDTO);
        Task<UserLogDTO> userLogin(UserLogDTO userlogDTO);
        Task<UserProDTO> userProfile(int Id, UserProDTO userproDTO);
        Task<bool> userDelete(int Id);
    }
}
