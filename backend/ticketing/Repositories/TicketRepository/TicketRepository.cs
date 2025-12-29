using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using ticketing.Data;
using ticketing.Models;
using ticketing.Repositories.Interface;

namespace ticketing.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly ApplicationContext _dbContext;
    private readonly IAuthRepository _authRepository;

    public TicketRepository(ApplicationContext dbContext, IAuthRepository authRepository)
    {
        _dbContext = dbContext;
        _authRepository = authRepository;
    }

    public async Task<List<Ticket>> GetAllTicketsAsync(ClaimsPrincipal claims)
    {
        var user = await _authRepository.GetUserAsync(claims);

        return await _dbContext.Tickets.Where(t => t.OrganizationName == user!.OrganizationName).ToListAsync();
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