namespace ticketing.Hubs
{
    public static class MapHubs
    {
        public static WebApplication MapSignalRHubs(this WebApplication app)
        {
            app.MapHub<TicketHub>("/ticketHub");

            return app;
        }
    }
}