using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ticketing.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }

        public required string OrganizationName { get; set; }

        public required string Priority { get; set; }

        public required string Status { get; set; }

        public required string AsignedToUserId {get;set;}

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public List<TicketComment> Comments { get; set; } = new();

        public List<MediaEntry> MediaEntries { get; set; } = new();

        [ForeignKey("AsignedToUserId")]
        public AppUser? AssignedToUser { get; set; }
    
    }
}
