using ticketing.Models;

namespace ticketing.Repositories
{
    public interface IMediaEntryRepository
    {
        Task<MediaEntry?> GetMediaEntryAsync(int id);

        Task<bool> SaveMediaEntryAsync(MediaEntry mediaEntry);

        Task<bool> SaveMediaEntriesAsync(List<MediaEntry> mediaEntries);

        Task<bool> DeleteMediaEntryAsync(int id);
    }
}