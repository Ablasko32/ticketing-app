using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ticketing.Constants;
using ticketing.DTOs;
using ticketing.Services.Interface;

namespace ticketing.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdminAsync([FromBody] RegisterAdminDTO registerData)
        {
            try
            {
                var result = await _authService.RegisterAdminAsync(registerData);
                if (result.Succeeded)
                {
                    return Ok(new { message = "User created succesfully" });
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating new user");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDTO loginData)
        {
            try
            {
                var result = await _authService.LoginAsync(loginData);
                if (result.Succeeded)
                {
                    return Ok(new { message = "Signed in succesfully" });
                }
                else
                {
                    _logger.LogWarning("Unauthorized logging attempt for {email}", loginData.Email);
                    return Unauthorized(HTTPErrorResponses.Unauthorized);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loging in");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            try
            {
                await _authService.LogoutAsync();
                return Ok(new { message = "Logged out succesfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error siging out");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUserAsync(RegisterUserDTO registerUserData)
        {
            try
            {
                var result = await _authService.RegisterUserAsync(registerUserData);
                if (result.Succeeded)
                {
                    return Ok(new { message = "User created succesfully" });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error siging out");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var users = await _authService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all users");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("user/{userId}")]
        public async Task<IActionResult> DeleteUserAsync(string userId)
        {
            try
            {
                var result = await _authService.DeleteUserAsync(userId);
                if (result.Succeeded)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }

        [HttpGet("status")]
        public IActionResult GetAuthStatus()
        {
            try
            {
                var result = _authService.GetAuthStatus();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching auth status");
                return StatusCode(StatusCodes.Status500InternalServerError, HTTPErrorResponses.InternalServerError);
            }
        }
    }
}