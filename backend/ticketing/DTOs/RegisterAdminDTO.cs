using System.ComponentModel.DataAnnotations;

namespace ticketing.DTOs
{
    public class RegisterAdminDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Organization name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Organization name must be between 3 and 50 characters")]
        public required string OrganizationName { get; set; }
    }
}