namespace ticketing.DTOs
{
    public class CreateMediaEntryDTO
    {
        public required string RelativePath { get; set; }
        public required int TicketId { get; set; }  
    }
}
