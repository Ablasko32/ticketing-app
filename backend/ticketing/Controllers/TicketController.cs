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
        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicketAsync(int ticketId, [FromQuery] bool includeComments)
        {
            try
            {
                var ticket = await _ticketService.GetTicketAsync(ticketId, includeComments);
                if (ticket == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ticket);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
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

        [Authorize]
        [HttpPut("{ticketId}")]
        public async Task<IActionResult> UpdateTicketAsync(int ticketId, [FromBody] UpdateTicketDTO updateDTO)
        {
            try
            {
                var result = await _ticketService.UpdateTicketAsync(ticketId, updateDTO);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating ticket");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize]
        [HttpPost("comment")]
        public async Task<IActionResult> CreateTicketCommentAsync([FromBody] CreateTicketCommentDTO createComment)
        {
            try
            {
                var result = await _ticketService.CreateTicketCommentAsync(createComment);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ticket comment");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize]
        [HttpDelete("comment/{commentId}")]
        public async Task<IActionResult> DeleteTicketCommentAsync(int commentId)
        {
            try
            {
                var result = await _ticketService.DeleteTicketCommentAsync(commentId);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting ticket comment");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }
    }
}