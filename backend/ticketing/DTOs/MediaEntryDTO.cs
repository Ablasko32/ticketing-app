namespace ticketing.DTOs
{
    public class MediaEntryDTO
    {
        public int Id { get; set; }
        public required string RelativePath { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
