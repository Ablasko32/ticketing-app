using Microsoft.EntityFrameworkCore;
using ticketing.Data;
using ticketing.Models;

namespace ticketing.Repositories
{
    public class MediaEntryRepository : IMediaEntryRepository
    {
        private readonly ApplicationContext _dbContext;

        public MediaEntryRepository(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<MediaEntry?> GetMediaEntryAsync(int id)
        {
            return await _dbContext.MediaEntries.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<bool> SaveMediaEntryAsync(MediaEntry mediaEntry)
        {
            _dbContext.MediaEntries.Add(mediaEntry);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteMediaEntryAsync(int id)
        {
            var result = await _dbContext.MediaEntries.Where(m => m.Id == id).ExecuteDeleteAsync();
            return result > 0;
        }
    }
}