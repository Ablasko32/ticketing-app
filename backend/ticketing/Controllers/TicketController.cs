using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using ticketing.Constants;
using ticketing.DTOs;
using ticketing.Services;

namespace ticketing.Controllers
{
    [Route("/ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        private readonly ILogger<TicketController> _logger;
        private readonly IFileStorageService _fileStorageService;

        public TicketController(ITicketService ticketService, ILogger<TicketController> logger, IFileStorageService fileStorageService)
        {
            _logger = logger;
            _ticketService = ticketService;
            _fileStorageService = fileStorageService;
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
                _logger.LogError(ex, "Error fetching ticket");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("")]
        public async Task<IActionResult> CreateNewTicketAsync([FromForm] CreateTicketDTO ticket)
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

        [Authorize]
        [HttpDelete("media/{mediaId}")]
        public async Task<IActionResult> DeleteTicketMediaFileAsync(int mediaId)
        {
            try
            {
                var result = await _fileStorageService.DeleteFileAsync(mediaId);
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
                _logger.LogError(ex, "Error deleting ticket media");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize]
        [HttpGet("media/{mediaId}")]
        public async Task<IActionResult> GetMediaFileStreamAsync(int mediaId)
        {
            try
            {
                var stream = await _fileStorageService.GetFileAsync(mediaId);
                if (stream == null)
                {
                    return NotFound();
                }

                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(stream.Name, out var contentType))
                {
                    contentType = "application/octet-stream";
                }

                return File(stream, contentType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching ticket media");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }
    }
}