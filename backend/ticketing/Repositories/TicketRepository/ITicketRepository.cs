using System.Security.Claims;
using ticketing.Models;

namespace ticketing.Repositories
{
    public interface ITicketRepository
    {
        Task<List<Ticket>> GetAllTicketsAsync(ClaimsPrincipal claims);

        Task<Ticket> CreateNewTicketAsync(Ticket ticket);

        Task<bool> DeleteTicketAsync(int ticketId);

        Task<bool> UpdateTicketAsync(Ticket ticket);

        Task<Ticket?> GetTicketAsync(int ticketId, bool includeComments);

        Task<TicketComment> CreateTicketCommentAsync(TicketComment ticketComment);

        Task<bool> DeleteTicketCommentAsync(int commentId);
    }
}