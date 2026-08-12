using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Venders
{
    public interface IVendersRepo
    {
        Task<VenderModel> AddVendorRequest(VenderModel AddVendorRequest);
        Task<List<VenderModel>> GetAllVendorRequests();
        Task<bool> DeleteVendorRequest(int id);
        Task<VenderModel?> ApproveVendorRequest(int id);
    }
}