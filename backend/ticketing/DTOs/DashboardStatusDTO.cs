namespace ticketing.DTOs
{
    public class DashboardStatsDTO
    {
        public int TotalTickets { get; set; }
        public int OpenTickets { get; set; }
        public int InProgressTickets { get; set; }
        public int CompletedTickets { get; set; }
        public int HighPriorityTickets { get; set; }
        public int MediumPriorityTickets { get; set; }
        public int LowPriorityTickets { get; set; }
        public int HighPriorityOpen { get; set; }
        public double CompletionRate { get; set; }
        public List<TicketDTO>? HighPriorityOpenTickets { get; set; }
    }
}