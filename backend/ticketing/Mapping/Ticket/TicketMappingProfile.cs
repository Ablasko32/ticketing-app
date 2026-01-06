using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;

namespace ticketing.Mapping;

public class TicketMappingProfile : Profile
{
    public TicketMappingProfile()
    {
        CreateMap<Ticket, TicketDTO>().ForMember(dest => dest.TicketComments, opt => opt.MapFrom(src => src.Comments));
        CreateMap<CreateTicketDTO, Ticket>();
        CreateMap<UpdateTicketDTO, Ticket>().ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<TicketComment, TicketCommentDTO>().ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.UserName));
        CreateMap<CreateTicketCommentDTO, TicketComment>();
    }
}