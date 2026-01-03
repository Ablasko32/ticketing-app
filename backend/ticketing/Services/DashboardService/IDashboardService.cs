using ticketing.DTOs;

namespace ticketing.Services
{
    public interface IDashboardService
    {
        Task<DashboardStatsDTO> GetDashboardStatsAsync();
    }
}