using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;

namespace ticketing.Mapping.Media
{
    public class MediaMappingProfile : Profile
    {
        public MediaMappingProfile()
        {
            CreateMap<CreateMediaEntryDTO, MediaEntry>();
        }
    }
}