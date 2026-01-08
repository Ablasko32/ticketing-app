namespace ticketing.DTOs
{
    public class CreateTicketDTO
    {
        public required string Title { get; set; }
        public required string Description { get; set; }

        public required string Priority { get; set; }

        public List<IFormFile>? TicketFiles { get; set; } 
    }
}
