using Microsoft.AspNetCore.SignalR;
using ticketing.Hubs;

namespace ticketing.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<SignalRHub> _signalRHub;

        public NotificationService(IHubContext<SignalRHub> signalRHub)
        {
            _signalRHub = signalRHub;
        }

        public async Task SendNewTicketAlert(string organizationName, string message)
        {
            await _signalRHub.Clients.Group(organizationName).SendAsync(SignalREvents.Tickets.NewTicketAlert, message);
        }

        public async Task SendNewCommentAlert(int ticketId, string message)
        {
            await _signalRHub.Clients.Group($"Ticket_${ticketId}").SendAsync(SignalREvents.Tickets.NewCommentAlert, message);
        }
    }
}