using ticketing.Repositories.Interface;

namespace ticketing.Repositories
{
    public static class RepositoryMapping
    {
        public static WebApplicationBuilder MapRepositories(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IAuthRepository, AuthRepository>();

            return builder;
        }
    }
}