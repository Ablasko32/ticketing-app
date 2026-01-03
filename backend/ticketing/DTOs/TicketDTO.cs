namespace ticketing.DTOs
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Priority { get; set; }
        public required string Status { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}