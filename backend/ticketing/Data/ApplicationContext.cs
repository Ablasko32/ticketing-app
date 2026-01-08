using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ticketing.Models;

namespace ticketing.Data
{
    public class ApplicationContext : IdentityDbContext<AppUser>

    {
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<MediaEntry> MediaEntries { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<TicketComment>().HasOne(c => c.Ticket)
                                            .WithMany(t => t.Comments)
                                            .HasForeignKey(c => c.TicketId)
                                            .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<MediaEntry>().HasOne<Ticket>()
                                        .WithMany(t => t.MediaEntries)
                                        .HasForeignKey(m=>m.TicketId)
                                        .OnDelete(DeleteBehavior.Cascade);
        }

    }
}