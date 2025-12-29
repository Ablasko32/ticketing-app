using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ticketing.data.migrations
{
    /// <inheritdoc />
    public partial class TicketModification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrganizationName",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizationName",
                table: "Tickets");
        }
    }
}
