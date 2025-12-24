using System.ComponentModel.DataAnnotations;
using ticketing.Constants;

namespace ticketing.DTOs
{
    public class RegisterUserDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Not a valid Email address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Role is required")]
        [AllowedValues(UserRoles.User, UserRoles.Agent, ErrorMessage = "Role must be either 'user' or 'agent'")]
        public required string Role { get; set; }
    }
}