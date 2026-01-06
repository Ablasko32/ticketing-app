namespace ticketing.DTOs
{
    public class TicketCommentDTO
    {
        public int Id { get; set; }
        public required string Content { get; set; }
        public required DateTime DateCreated { get; set; }

        public required string CreatedByUserId { get; set; }
        public  string? Username { get; set; }
    }
}
