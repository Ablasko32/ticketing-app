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

    public async Task<List<Ticket>> GetAllTicketsAsync(ClaimsPrincipal claims, string? filter)
    {
        var user = await _authRepository.GetUserAsync(claims);
        IQueryable<Ticket> query = _dbContext.Tickets.Where(t => t.OrganizationName == user!.OrganizationName);

        if (filter == null || filter == "all")
        {
            return await query.ToListAsync();
        }
        return await query.Where(t => t.AsignedToUserId == user!.Id).ToListAsync();
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

    public async Task<bool> UpdateTicketAsync(Ticket ticket)
    {
        _dbContext.Tickets.Update(ticket);
        var rows = await _dbContext.SaveChangesAsync();
        return rows > 0;
    }

    public async Task<Ticket?> GetTicketAsync(int ticketId, bool includeComments = false)
    {
        IQueryable<Ticket> query = _dbContext.Tickets;

        if (includeComments)
        {
            query = query.Include(t => t.Comments).ThenInclude(c => c.User);
        }
        return await query.Include(t => t.MediaEntries).Include(t=>t.AssignedToUser).FirstOrDefaultAsync(t => t.Id == ticketId);
    }

    public async Task<TicketComment> CreateTicketCommentAsync(TicketComment ticketComment)
    {
        _dbContext.TicketComments.Add(ticketComment);
        await _dbContext.SaveChangesAsync();
        return ticketComment;
    }

    public async Task<bool> DeleteTicketCommentAsync(int commentId)
    {
        var result = await _dbContext.TicketComments.Where(tc => tc.Id == commentId).ExecuteDeleteAsync();

        return result > 0;
    }
}