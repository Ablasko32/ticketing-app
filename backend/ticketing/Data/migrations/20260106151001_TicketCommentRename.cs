using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ticketing.data.migrations
{
    /// <inheritdoc />
    public partial class TicketCommentRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketComment_AspNetUsers_CreatedByUserId",
                table: "TicketComment");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketComment_Tickets_TicketId",
                table: "TicketComment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketComment",
                table: "TicketComment");

            migrationBuilder.RenameTable(
                name: "TicketComment",
                newName: "TicketComments");

            migrationBuilder.RenameIndex(
                name: "IX_TicketComment_TicketId",
                table: "TicketComments",
                newName: "IX_TicketComments_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketComment_CreatedByUserId",
                table: "TicketComments",
                newName: "IX_TicketComments_CreatedByUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketComments",
                table: "TicketComments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketComments_AspNetUsers_CreatedByUserId",
                table: "TicketComments",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketComments_Tickets_TicketId",
                table: "TicketComments",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketComments_AspNetUsers_CreatedByUserId",
                table: "TicketComments");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketComments_Tickets_TicketId",
                table: "TicketComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketComments",
                table: "TicketComments");

            migrationBuilder.RenameTable(
                name: "TicketComments",
                newName: "TicketComment");

            migrationBuilder.RenameIndex(
                name: "IX_TicketComments_TicketId",
                table: "TicketComment",
                newName: "IX_TicketComment_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketComments_CreatedByUserId",
                table: "TicketComment",
                newName: "IX_TicketComment_CreatedByUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketComment",
                table: "TicketComment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketComment_AspNetUsers_CreatedByUserId",
                table: "TicketComment",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketComment_Tickets_TicketId",
                table: "TicketComment",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
