using ticketing.DTOs;
using ticketing.Models;

namespace ticketing.Services
{
    public interface ITicketService
    {
        Task<List<TicketDTO>> GetAllTicketsAsync();

        Task<Ticket> CreateNewTicketAsync(CreateTicketDTO newTicket);

        Task<bool> DeleteTicketAsync(int ticketId);

        Task<bool> UpdateTicketAsync(int ticketId, UpdateTicketDTO updateDTO);

        Task<TicketDTO> GetTicketAsync(int ticketId, bool includeComments);

        Task<TicketCommentDTO> CreateTicketCommentAsync(CreateTicketCommentDTO ticketCommentDTO);
    }
}