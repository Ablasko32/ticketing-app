using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ticketing.Constants;

namespace ticketing.Data
{
    public static class DataExtensions
    {
        public static async Task<WebApplication> MigrateDbAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationContext>>();

            logger.LogInformation("Database Migration Extension Triggered, finding pending migrations...");

            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

            var pendingMigrations = await dbContext.Database.GetPendingMigrationsAsync();

            if (pendingMigrations.Any())
            {
                logger.LogInformation($"Found {pendingMigrations.Count()} migrations.");
                await dbContext.Database.MigrateAsync();
                logger.LogInformation($"Migrations executed succesfully");
            }
            else
            {
                logger.LogInformation("Database is up to date.");
            }

            return app;
        }

        public static async Task<WebApplication> SeedRolesAsync(this WebApplication app)
        {
            

            using var scope = app.Services.CreateScope();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationContext>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            logger.LogInformation("Checking if application roles are seeded");
            foreach (var role in UserRoles.All)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            logger.LogInformation("Role seeding check complete.");
            return app;
        }
    }
}