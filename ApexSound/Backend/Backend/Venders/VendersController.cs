using Backend.Controller;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Venders
{
    [Route("api/vendor")]
    [ApiController]
    public class VendersController : BaseController
    {
        private readonly IVendersRepo _vendersRepo;
        public VendersController(IVendersRepo vendersRepo)
        {
            _vendersRepo = vendersRepo;
        }

        // ADD VENDOR REQUEST
        [HttpPost("add")]
        public async Task<IActionResult> AddVendorRequest(VenderModel AddVendorRequest)
        {
            return await TryCatch(async () =>
            {
                var Request = await _vendersRepo.AddVendorRequest(AddVendorRequest);
                return Request;
            }, "Vendor Request Submitted Successfully");
        }

        // APPROVE VENDOR REQUEST
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveVendorRequest(int id)
        {
            return await TryCatch(async () =>
            {
                var Request = await _vendersRepo.ApproveVendorRequest(id);
                return Request;
            }, "Vendor Request Approved Successfully");
        }

        // DELETE VENDOR REQUEST
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteVendorRequest(int id)
        {
            return await TryCatch(async () =>
            {
                var Deleted = await _vendersRepo.DeleteVendorRequest(id);
                return Deleted;
            }, "Vendor Request Deleted Successfully");
        }

        // GET ALL VENDOR REQUESTS
        [HttpGet("all")]
        public async Task<IActionResult> GetAllVendorRequests()
        {
            return await TryCatch(async () =>
            {
                var List = await _vendersRepo.GetAllVendorRequests();
                return List;
            }, "Vendor Requests Fetched Successfully");
        }
    }
}