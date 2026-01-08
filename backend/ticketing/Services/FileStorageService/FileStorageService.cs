using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;
using ticketing.Repositories;

namespace ticketing.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly string _uploadPath;
        private readonly IMediaEntryRepository _mediaEntryRepository;
        private readonly IMapper _mapper;

        public FileStorageService(IWebHostEnvironment webHostEnvironment, IMediaEntryRepository mediaEntryRepository, IMapper mapper)
        {
            _webHostEnvironment = webHostEnvironment;
            _uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            _mediaEntryRepository = mediaEntryRepository;
            _mapper = mapper;
        }

        public async Task<bool> SaveFileAsync(IFormFile file, int ticketId)
        {
            if (file == null || file.Length == 0)
            {
                return false;
            }

            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var uploadPath = Path.Combine(_uploadPath, fileName);

            using var stream = new FileStream(uploadPath, FileMode.Create);
            await file.CopyToAsync(stream);

            // Save to DB
            var createMediaDto = new CreateMediaEntryDTO { RelativePath = fileName, TicketId = ticketId };
            return await _mediaEntryRepository.SaveMediaEntryAsync(_mapper.Map<MediaEntry>(createMediaDto));
        }

        public async Task<bool> DeleteFileAsync(int Id)
        {
            var mediaEntry = await _mediaEntryRepository.GetMediaEntryAsync(Id);
            if (mediaEntry == null) return false;

            var fullPath = Path.Combine(_uploadPath, mediaEntry.RelativePath);

            if (File.Exists(fullPath))
            {
                await Task.Run(() => File.Delete(fullPath));
            }

            return await _mediaEntryRepository.DeleteMediaEntryAsync(Id);
        }
    }
}