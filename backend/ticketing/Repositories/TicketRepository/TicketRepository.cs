using Microsoft.EntityFrameworkCore;
using ticketing.Data;
using ticketing.Models;

namespace ticketing.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly ApplicationContext _dbContext;

    public TicketRepository(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Ticket>> GetAllTicketsAsync()
    {
        return await _dbContext.Tickets.ToListAsync();
    }

    public async Task<Ticket> CreateNewTicketAsync(Ticket ticket)
    {
        _dbContext.Tickets.Add(ticket);
        await _dbContext.SaveChangesAsync();
        return ticket;
    }

    public async Task<bool> DeleteTicketAsync(int ticketId)
    {
        var result = await _dbContext.Tickets.Where(t => t.Id == ticketId).ExecuteDeleteAsync();
        return result > 0;
    }
}