using AutoMapper;
using ticketing.DTOs;
using ticketing.Models;
using ticketing.Repositories;
using ticketing.Repositories.Interface;

namespace ticketing.Services
{
    public class TicketService : ITicketService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IHttpContextAccessor _httpContextAccesor;
        private readonly ITicketRepository _ticketRepository;
        private readonly IMapper _mapper;

        public TicketService(IAuthRepository authRepository,  ITicketRepository ticketRepository, IMapper mapper, IHttpContextAccessor httpContextAccesor )
        {
            _ticketRepository = ticketRepository;
            _authRepository = authRepository;
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
            var claims = _httpContextAccesor.HttpContext!.User;
            var user = await _authRepository.GetUserAsync(claims);
            var ticket = _mapper.Map<Ticket>(newTicket);
            ticket.OrganizationName = user!.OrganizationName;
            // TODO: Move to enum
            ticket.Status = "todo";
            return await _ticketRepository.CreateNewTicketAsync(ticket);
        }

        public async Task<bool> DeleteTicketAsync(int ticketId)
        {
            return await _ticketRepository.DeleteTicketAsync(ticketId);
        }
    }
}