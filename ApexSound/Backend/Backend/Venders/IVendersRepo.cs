using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Venders
{
    public interface IVendersRepo
    {
        Task<VenderModel> AddVendorRequest(VenderModel AddVendorRequest);
        Task<List<VenderModel>> GetAllVendorRequests();
        Task<VenderModel?> GetVendorRequestStatus(int userId);
        Task<bool> DeleteVendorRequest(int id);
        Task<VenderModel?> ApproveVendorRequest(int id);
    }
}