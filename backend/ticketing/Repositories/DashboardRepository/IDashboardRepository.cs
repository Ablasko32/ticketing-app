using System.Security.Claims;
using ticketing.DTOs;

namespace ticketing.Repositories
{
    public interface IDashboardRepository
    {
        Task<DashboardStatsDTO> GetDasbhoardDataAsync(ClaimsPrincipal claims);
    }
}
