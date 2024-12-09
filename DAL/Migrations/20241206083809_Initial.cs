using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VideoGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Platform = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Developer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Publisher = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoGames", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "VideoGames",
                columns: new[] { "Id", "Created", "Developer", "Platform", "Publisher", "Title", "Updated" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Nintendo", "Nintendo Switch", "Nintendo", "The Legend of Zelda: Breath of the Wild", new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Santa Monica Studio", "PlayStation 4", "Sony Interactive Entertainment", "God of War (2018)", new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "343 Industries", "Xbox Series X|S, PC", "Xbox Game Studios", "Halo Infinite", new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "CD Projekt Red", "PlayStation 4, Xbox One, PC", "CD Projekt", "Cyberpunk 2077", new DateTime(2024, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VideoGames");
        }
    }
}
