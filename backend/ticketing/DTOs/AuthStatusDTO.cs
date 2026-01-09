using System.ComponentModel.DataAnnotations;
using ticketing.Constants;

namespace ticketing.DTOs
{
    public class AuthStatusDTO
    {
        public bool IsAuthenticated { get; set; }

        [AllowedValues(UserRoles.Admin, UserRoles.User, ErrorMessage = "Only valid roles are allowed")]
        public string? Role { get; set; }

        public string? Email { get; set; }
        public string? UserId { get; set; }
        public string? OrganizationName { get; set; }
    }
}