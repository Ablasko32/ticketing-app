using System.Security.Claims;
using AutoMapper;
using ticketing.Constants;
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
        private readonly IFileStorageService _fileStorageService;
        private readonly IMapper _mapper;

        public TicketService(IAuthRepository authRepository, ITicketRepository ticketRepository, IMapper mapper, IHttpContextAccessor httpContextAccesor, IFileStorageService fileStorageService)
        {
            _ticketRepository = ticketRepository;
            _authRepository = authRepository;
            _mapper = mapper;
            _httpContextAccesor = httpContextAccesor;
            _fileStorageService = fileStorageService;
        }

        public async Task<List<TicketDTO>> GetAllTicketsAsync()
        {
            var claims = _httpContextAccesor.HttpContext!.User;
            var tickets = await _ticketRepository.GetAllTicketsAsync(claims);
            return _mapper.Map<List<TicketDTO>>(tickets);
        }

        public async Task<TicketDTO> GetTicketAsync(int ticketId, bool includeComments = false)
        {
            var ticket = await _ticketRepository.GetTicketAsync(ticketId, includeComments);
            return _mapper.Map<TicketDTO>(ticket);
        }

        public async Task<Ticket> CreateNewTicketAsync(CreateTicketDTO newTicket)
        {
            var claims = _httpContextAccesor.HttpContext!.User;
            var user = await _authRepository.GetUserAsync(claims);
            var ticket = _mapper.Map<Ticket>(newTicket);
            ticket.OrganizationName = user!.OrganizationName;

            ticket.Status = TicketStatus.Todo;

            await _ticketRepository.CreateNewTicketAsync(ticket);

            if (newTicket.TicketFiles != null && newTicket.TicketFiles.Count > 0)
            {
                foreach (var file in newTicket.TicketFiles)
                {
                    await _fileStorageService.SaveFileAsync(file, ticket.Id);
                }
            }
            return ticket;
        }

        public async Task<bool> DeleteTicketAsync(int ticketId)
        {
            var ticket = await _ticketRepository.GetTicketAsync(ticketId, false);
            if (ticket != null)
            {
                await _fileStorageService.DeleteFileAsync(ticket.Id);
            }

            return await _ticketRepository.DeleteTicketAsync(ticketId);
        }

        public async Task<bool> UpdateTicketAsync(int ticketId, UpdateTicketDTO updateDTO)
        {
            var ticket = await _ticketRepository.GetTicketAsync(ticketId, false);
            if (ticket == null)
            {
                return false;
            }

            _mapper.Map(updateDTO, ticket);

            return await _ticketRepository.UpdateTicketAsync(ticket);
        }

        public async Task<TicketCommentDTO> CreateTicketCommentAsync(CreateTicketCommentDTO ticketCommentDTO)
        {
            var claims = _httpContextAccesor?.HttpContext?.User;
            var ticketComment = _mapper.Map<TicketComment>(ticketCommentDTO);
            ticketComment.CreatedByUserId = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var createdTicketComment = await _ticketRepository.CreateTicketCommentAsync(ticketComment);
            return _mapper.Map<TicketCommentDTO>(createdTicketComment);
        }

        public async Task<bool> DeleteTicketCommentAsync(int commentId)
        {
            return await _ticketRepository.DeleteTicketCommentAsync(commentId);
        }
    }
}