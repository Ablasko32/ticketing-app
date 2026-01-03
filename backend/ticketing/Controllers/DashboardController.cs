using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ticketing.Constants;
using ticketing.Services;

namespace ticketing.Controllers
{
    [ApiController]
    [Route("dashboard")]
    public class DashboardController : ControllerBase

    {
        private readonly IDashboardService _dashboardService;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger)
        {
            _dashboardService = dashboardService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetDashboardStatsAsync()
        {
            try
            {
                var result = await _dashboardService.GetDashboardStatsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching dashboard stats");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }
    }
}