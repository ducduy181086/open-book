using Microsoft.EntityFrameworkCore.Migrations;

namespace quiz_app.Data.Migrations
{
    public partial class BookItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookItems",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    County = table.Column<string>(maxLength: 50, nullable: true),
                    Country = table.Column<string>(maxLength: 50, nullable: true),
                    Town = table.Column<string>(maxLength: 50, nullable: true),
                    Postcode = table.Column<string>(maxLength: 10, nullable: true),
                    Description = table.Column<string>(maxLength: 255, nullable: true),
                    DisplayableAddress = table.Column<string>(maxLength: 255, nullable: true),
                    Image = table.Column<string>(maxLength: 255, nullable: true),
                    Latitude = table.Column<string>(maxLength: 50, nullable: true),
                    Longitude = table.Column<string>(maxLength: 50, nullable: true),
                    NumberOfBedrooms = table.Column<byte>(nullable: false),
                    NumberOfBathrooms = table.Column<byte>(nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PropertyType = table.Column<string>(maxLength: 50, nullable: true),
                    ForWhat = table.Column<byte>(nullable: false),
                    ImportType = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookItems");
        }
    }
}
