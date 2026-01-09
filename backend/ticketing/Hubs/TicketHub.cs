using Microsoft.AspNetCore.SignalR;

namespace ticketing.Hubs
{
    public class TicketHub : Hub
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
    }
}