using Microsoft.AspNetCore.SignalR;

namespace ticketing.Hubs
{
    public class TicketHub : Hub
    {


        public override async Task OnConnectedAsync()
        {

            var userOrganization = Context.User.FindFirst("OrganizationName")?.Value;

            await base.OnConnectedAsync();
        }

        //public async Task JoinOrganizationGroup(string organizationName)
        //{
        //    await Groups.AddToGroupAsync(Context.ConnectionId, organizationName);
        //}

        public async Task SendNewTicketNotification(string organizationName, string message)
        {
            await Clients.Group(organizationName).SendAsync("NewTicketAlert", message);
        }
    }
}