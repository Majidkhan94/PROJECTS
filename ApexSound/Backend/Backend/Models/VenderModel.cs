using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum RequestStatus
    {
        Pending, Approved, Rejected
    }

    public class VenderModel
    {
        [Key]
        public int Id { get; set; }
        public string? VendorName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Message { get; set; }
        public RequestStatus? Status { get; set; } = RequestStatus.Pending;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public AuthModel? User { get; set; }
    }
}