using Backend.Models;
namespace Backend.Payment
{
    public interface IPaymentRepo
    {
        Task<string> CreateCheckoutSession(PaymentModel request);
    }
}   