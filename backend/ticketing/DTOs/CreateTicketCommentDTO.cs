namespace ticketing.DTOs
{
    public class CreateTicketCommentDTO
    {
        public required string Content { get; set; }
        public required string TicketId {  get; set; }   
    }
}
