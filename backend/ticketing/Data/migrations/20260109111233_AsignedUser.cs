using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ticketing.data.migrations
{
    /// <inheritdoc />
    public partial class AsignedUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AsignedToUserId",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AsignedToUserId",
                table: "Tickets",
                column: "AsignedToUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_AsignedToUserId",
                table: "Tickets",
                column: "AsignedToUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_AsignedToUserId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_AsignedToUserId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "AsignedToUserId",
                table: "Tickets");
        }
    }
}
