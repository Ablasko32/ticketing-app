namespace ticketing.Services
{
    public interface INotificationService
    {
        Task SendNewTicketAlert(string organizationName, string message);

        Task SendNewCommentAlert(int ticketId, string message);
    }
}