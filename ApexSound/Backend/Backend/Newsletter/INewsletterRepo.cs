using Backend.Newsletter;

namespace Backend.Newsletter
{
    public interface INewsletterRepo
    {
        Task<List<NewsletterModel>> ListNewsletter();
        Task<NewsletterModel> AddNewsletter(NewsletterModel addnewsletter);
        Task<bool> DeleteNewsletter(int Id);
    }
}
