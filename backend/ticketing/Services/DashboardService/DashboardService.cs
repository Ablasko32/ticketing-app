using ticketing.DTOs;
using ticketing.Repositories;

namespace ticketing.Services
{
    public class DashboardService:IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;
        private readonly IHttpContextAccessor _httpContextAccesor;

        public DashboardService(IDashboardRepository dashboardRepository, IHttpContextAccessor httpContextAccessor)
        {
            _dashboardRepository = dashboardRepository;
            _httpContextAccesor = httpContextAccessor;
        }

        public async Task<DashboardStatsDTO> GetDashboardStatsAsync()
        {
            var claims = _httpContextAccesor.HttpContext!.User;
            return await _dashboardRepository.GetDasbhoardDataAsync(claims);
        }
    }
}