namespace ticketing.Services
{
    public interface IFileStorageService
    {
        Task<bool> SaveFileAsync(IFormFile file, int ticketId);

        Task<bool> SaveFilesAsync(List<IFormFile> files, int ticketId);

        Task<bool> DeleteFileAsync(int Id);

        Task<FileStream?> GetFileAsync(int mediaId);

        string GetContentType(string relativePath);
    }
}