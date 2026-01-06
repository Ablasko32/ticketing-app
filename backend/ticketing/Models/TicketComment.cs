using System.ComponentModel.DataAnnotations.Schema;

namespace ticketing.Models
{
    public class TicketComment
    {
        public required int Id { get; set; }
        public required int TicketId { get; set; }

        public required string Content { get;set; }
        public required DateTime DateCreated { get; set; }=DateTime.UtcNow;
        public required string CreatedByUserId { get; set; }

        [ForeignKey("TicketId")]
        public Ticket Ticket { get; set; } = null!;
        [ForeignKey("CreatedByUserId")]
        public AppUser User { get; set; } = null!;
    }
}
