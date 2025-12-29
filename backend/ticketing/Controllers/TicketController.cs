using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ticketing.Constants;
using ticketing.DTOs;
using ticketing.Models;
using ticketing.Services;

namespace ticketing.Controllers
{
    [Route("/ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        private readonly ILogger<TicketController> _logger;

        public TicketController(ITicketService ticketService, ILogger<TicketController> logger)
        {
            _logger = logger;
            _ticketService = ticketService;
        }

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetAllTicketsAsync()
        {
            try
            {
                var result = await _ticketService.GetAllTicketsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching tickets");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> CreateNewTicketAsync([FromBody] CreateTicketDTO ticket)
        {
            try
            {
                var result = await _ticketService.CreateNewTicketAsync(ticket);
                return Created();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ticket");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize]
        [HttpDelete("{ticketId}")]
        public async Task<IActionResult> DeleteTicketAsync(int ticketId)
        {
            try
            {
                var result = await _ticketService.DeleteTicketAsync(ticketId);
                if (result)
                {
                    return Created();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting ticket");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }
    }
}