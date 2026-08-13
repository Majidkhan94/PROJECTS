using Backend.Controller;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Payment
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : BaseController
    {
        private readonly IPaymentRepo _paymentRepo;
        public PaymentController(IPaymentRepo paymentRepo)
        {
            _paymentRepo = paymentRepo;
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] PaymentModel request)
        {
            return await TryCatch(async () =>
            {
                var url = await _paymentRepo.CreateCheckoutSession(request);
                return new { url };
            }, "Checkout Session Created");
        }
    }
}