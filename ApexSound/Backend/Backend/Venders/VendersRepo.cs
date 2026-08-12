using Backend.Models;
using Backend.ConnectionStrings;
using Microsoft.EntityFrameworkCore;

namespace Backend.Venders
{
    public class VendersRepo : IVendersRepo
    {
        private readonly ConnectionString _connectionString;
        public VendersRepo(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }

        // ADD VENDOR REQUEST
        public async Task<VenderModel> AddVendorRequest(VenderModel AddVendorRequest)
        {
            // All Fields Check
            if
                (string.IsNullOrEmpty(AddVendorRequest.VendorName) ||
                string.IsNullOrEmpty(AddVendorRequest.Email) ||
                string.IsNullOrEmpty(AddVendorRequest.Phone) ||
                string.IsNullOrEmpty(AddVendorRequest.Message))
            {
                throw new Exception("All Fields is Required");
            }

            var currentuser = await _connectionString.Registeration.FirstOrDefaultAsync(U => U.Id == AddVendorRequest.UserId);
            if (currentuser == null) {throw new Exception("User Not Found");}
            if (currentuser.Email.Trim() != AddVendorRequest.Email.Trim()){throw new Exception("Email must match your logged-in account email");}


            var existemail = await _connectionString.VendorRequests.FirstOrDefaultAsync(E => E.Email == AddVendorRequest.Email);
            if (existemail != null) { throw new Exception("Email already exists"); }

            var Request = new VenderModel
            {
                VendorName = AddVendorRequest.VendorName.Trim(),
                Email = AddVendorRequest.Email.Trim().ToLower(),
                Phone = AddVendorRequest.Phone.Trim(),  
                Message = AddVendorRequest.Message.Trim(),
                Status = RequestStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UserId = AddVendorRequest.UserId
            };

            await _connectionString.VendorRequests.AddAsync(Request);
            await _connectionString.SaveChangesAsync();
            return Request;
        }

        // APPROVE VENDOR REQUEST
        public async Task<VenderModel?> ApproveVendorRequest(int id)
        {
            var Request = await _connectionString.VendorRequests.FindAsync(id);
            if (Request == null) throw new Exception("Vendor Request Not Found");

            Request.Status = RequestStatus.Approved;

            var user = await _connectionString.Registeration.FirstOrDefaultAsync(u => u.Id == Request.UserId);
            if (user != null)
            {
                user.role = AuthModel.Role.Vender;
            }

            await _connectionString.SaveChangesAsync();
            return Request;
        }

        // DELETE VENDOR REQUEST
        public async Task<bool> DeleteVendorRequest(int id)
        {
            var Request = await _connectionString.VendorRequests.FindAsync(id);
            if (Request != null)
            {
                _connectionString.VendorRequests.Remove(Request);
                await _connectionString.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // GET ALL VENDOR REQUESTS
        public async Task<List<VenderModel>> GetAllVendorRequests()
        {
            return await _connectionString.VendorRequests.ToListAsync();
        }


        // GET VENDOR REQUEST STATUS
        public async Task<VenderModel?> GetVendorRequestStatus(int userId)
        {
            var Request = await _connectionString.VendorRequests.FirstOrDefaultAsync(v => v.UserId == userId);
            return Request;
        }









    }
}