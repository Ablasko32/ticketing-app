using System.IO;
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
            _uploadPath = Path.Combine(_webHostEnvironment.ContentRootPath,"local-storage", "uploads");
            _mediaEntryRepository = mediaEntryRepository;
            _mapper = mapper;
        }

        public async Task<bool> SaveFilesAsync(List<IFormFile> files, int ticketId)
        {
            if (files.Count == 0) return false;
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }

            var mediaEntriesToSave = new List<CreateMediaEntryDTO>();

            foreach (var file in files)
            {
                if (file.Length == 0) continue;

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                var uploadPath = Path.Combine(_uploadPath, fileName);

                using (var stream = new FileStream(uploadPath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, true))
                {
                    await file.CopyToAsync(stream);
                };
                

                var newMedia = new CreateMediaEntryDTO { RelativePath = fileName, TicketId = ticketId };

                mediaEntriesToSave.Add(newMedia);
            }

            return await _mediaEntryRepository.SaveMediaEntriesAsync(_mapper.Map<List<MediaEntry>>(mediaEntriesToSave));
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

            using var stream = new FileStream(uploadPath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, true);
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

        public async Task<FileStream?> GetFileAsync(int mediaId)
        {
            var mediaEntry = await _mediaEntryRepository.GetMediaEntryAsync(mediaId);
            if (mediaEntry == null)
            {
                return null;
            }

            return new FileStream(Path.Combine(_uploadPath, mediaEntry.RelativePath), FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true);
        }
    }
}