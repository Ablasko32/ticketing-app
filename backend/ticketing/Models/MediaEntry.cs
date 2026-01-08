namespace ticketing.Models
{
    public class MediaEntry
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public required string RelativePath { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}