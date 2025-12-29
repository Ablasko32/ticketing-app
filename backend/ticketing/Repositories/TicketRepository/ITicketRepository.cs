using ticketing.Models;

namespace ticketing.Repositories
{
    public interface ITicketRepository
    {
        Task<List<Ticket>> GetAllTicketsAsync();

        Task<Ticket> CreateNewTicketAsync(Ticket ticket);

        Task<bool> DeleteTicketAsync(int ticketId);
    }
}