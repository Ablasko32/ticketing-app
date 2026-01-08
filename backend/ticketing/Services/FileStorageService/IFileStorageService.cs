namespace ticketing.Services
{
    public interface IFileStorageService
    {
        Task<bool> SaveFileAsync(IFormFile file, int ticketId);

        Task<bool> DeleteFileAsync(int Id);
    }
}