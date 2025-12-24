using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ticketing.Models;

namespace ticketing.Data
{
    public class ApplicationContext : IdentityDbContext<AppUser>

    {
        public DbSet<Ticket> Tickets { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
    }
}