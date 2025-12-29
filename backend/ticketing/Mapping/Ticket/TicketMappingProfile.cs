using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;

namespace ticketing.Mapping;

public class TicketMappingProfile:Profile
{
    public TicketMappingProfile()
    {
        CreateMap<Ticket,TicketDTO>();
        CreateMap<CreateTicketDTO, Ticket>();
    }
}
