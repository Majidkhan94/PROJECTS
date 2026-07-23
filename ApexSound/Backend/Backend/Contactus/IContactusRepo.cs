namespace Backend.Contactus
{
    public interface IContactusRepo
    {
        Task <List<ContactusModel>> Contactlist ();
        Task<ContactusModel> Contactadd(ContactusModel contactadd);
        Task<bool> Contactdelete(int Id);
    }
}
