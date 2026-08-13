using Backend.Models;
using Stripe.Checkout;

namespace Backend.Payment
{
    public class PaymentRepo : IPaymentRepo
    {
        public async Task<string> CreateCheckoutSession(PaymentModel request)
        {
            if (request == null || request.Items == null || request.Items.Count == 0)
            {
                throw new Exception("No items to checkout");
            }

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = request.Items.Select(item => new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = (long)(item.Price * 100),
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.ProductName,
                        },
                    },
                    Quantity = item.Quantity,
                }).ToList(),
                Mode = "payment",
                SuccessUrl = "http://localhost:5173/order-success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "http://localhost:5173/cart",
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Url;
        }
    }
}