using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;

namespace ticketing.Mapping.User
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<AppUser, UserDTO>();
        }
    }
}