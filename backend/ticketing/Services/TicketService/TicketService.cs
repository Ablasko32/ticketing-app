using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;
using ticketing.Repositories;

namespace ticketing.Services
{
    public class TicketService : ITicketService
    {
        private readonly IHttpContextAccessor _httpContextAccesor;
        private readonly ITicketRepository _ticketRepository;
        private readonly IMapper _mapper;

        public TicketService(ITicketRepository ticketRepository, IMapper mapper, IHttpContextAccessor httpContextAccesor )
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
            _httpContextAccesor = httpContextAccesor;
        }

        public async Task<List<TicketDTO>> GetAllTicketsAsync()
        {
            var claims = _httpContextAccesor.HttpContext!.User;
            var tickets = await _ticketRepository.GetAllTicketsAsync(claims);
            return _mapper.Map<List<TicketDTO>>(tickets);
        }

        public async Task<Ticket> CreateNewTicketAsync(CreateTicketDTO newTicket)
        {
            return await _ticketRepository.CreateNewTicketAsync(_mapper.Map<Ticket>(newTicket));
        }

        public async Task<bool> DeleteTicketAsync(int ticketId)
        {
            return await _ticketRepository.DeleteTicketAsync(ticketId);
        }
    }
}