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

        public required string  AsignedUserName { get; set; }

        public List<TicketCommentDTO>? TicketComments { get;set; }

        public List<MediaEntryDTO>? MediaEntries { get; set; }
    }
}