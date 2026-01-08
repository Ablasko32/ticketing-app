using ticketing.Services.Interface;

namespace ticketing.Services
{
    public static class ServiceMapping
    {
        public static WebApplicationBuilder MapServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ITicketService, TicketService>();
            builder.Services.AddScoped<IDashboardService, DashboardService>();
            builder.Services.AddScoped<IFileStorageService, FileStorageService>();

            return builder;
        }
    }
}