using Microsoft.AspNetCore.SignalR;

namespace ticketing.Hubs
{
    public class SignalRHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var userOrganization = Context.User!.FindFirst("OrganizationName")?.Value;

            if (!string.IsNullOrEmpty(userOrganization))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userOrganization);
            }

            await base.OnConnectedAsync();
        }

        public async Task JoinTicketGroup(int ticketId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Ticket_${ticketId}");
        }

        public async Task LeaveTicketGroup(int ticketId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Ticket_${ticketId}");
        }
    }
}