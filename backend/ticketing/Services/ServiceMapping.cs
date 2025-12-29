using ticketing.Services.Interface;

namespace ticketing.Services
{
    public static class ServiceMapping
    {
        public static WebApplicationBuilder MapServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ITicketService, TicketService>();

            return builder;
        }
    }
}