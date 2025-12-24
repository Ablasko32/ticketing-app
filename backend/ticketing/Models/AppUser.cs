using Microsoft.AspNetCore.Identity;

namespace ticketing.Models
{
    public class AppUser:IdentityUser
    {
        public required string OrganizationName { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
