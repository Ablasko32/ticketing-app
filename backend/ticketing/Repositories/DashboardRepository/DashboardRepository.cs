using System.Security.Claims;
using AutoMapper;
using ticketing.Data;
using ticketing.DTOs;

using ticketing.Repositories.Interface;

namespace ticketing.Repositories;

public class DashboardRepository:IDashboardRepository
{
    private readonly ApplicationContext _dbContext;
    private readonly IAuthRepository _authRepository;
    private readonly ITicketRepository _ticketRepository;
    private readonly IMapper _mapper;

    public DashboardRepository(ApplicationContext dbContext, IAuthRepository authRepository, ITicketRepository ticketRepository,IMapper mapper)
    {
        _dbContext = dbContext;
        _authRepository = authRepository;
        _ticketRepository = ticketRepository;
        _mapper = mapper;
    }

    public async Task<DashboardStatsDTO> GetDasbhoardDataAsync(ClaimsPrincipal claims)
    {
        var user = await _authRepository.GetUserAsync(claims);

        var tickets = await _ticketRepository.GetAllTicketsAsync(claims);

        var stats = new DashboardStatsDTO
        {
            TotalTickets = tickets.Count(),
            OpenTickets = tickets.Count(t => t.Status == "todo" || t.Status == "progress"),
            InProgressTickets = tickets.Count(t => t.Status == "progress"),
            CompletedTickets = tickets.Count(t => t.Status == "done"),
            HighPriorityTickets = tickets.Count(t => t.Priority == "high"),
            MediumPriorityTickets = tickets.Count(t => t.Priority == "low"),
            LowPriorityTickets = tickets.Count(t => t.Priority == "medium"),
            HighPriorityOpen = tickets.Count(t =>
                                                t.Priority == "high" &&
                                                (t.Status == "todo" || t.Status == "progress")),
            CompletionRate = tickets.Count() > 0 ? Math.Round((double)tickets.Count(t => t.Status == "done") / tickets.Count * 100, 2) : 0,
            HighPriorityOpenTickets =_mapper.Map<List<TicketDTO>>(tickets
                                            .Where(t => t.Priority == "high" && (t.Status == "todo" || t.Status == "progress"))
                                            .ToList())
        };

        return stats;
    }
}