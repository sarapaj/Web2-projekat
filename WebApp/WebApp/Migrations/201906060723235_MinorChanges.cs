namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MinorChanges : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Coordinates", "Station_Id", "dbo.Stations");
            DropIndex("dbo.Coordinates", new[] { "Station_Id" });
            AddColumn("dbo.Stations", "CoordinateId", c => c.Int(nullable: false));
            AlterColumn("dbo.Tickets", "PurchaseDate", c => c.DateTime());
            AlterColumn("dbo.Tickets", "CheckInDate", c => c.DateTime());
            CreateIndex("dbo.Stations", "CoordinateId");
            AddForeignKey("dbo.Stations", "CoordinateId", "dbo.Coordinates", "Id", cascadeDelete: true);
            DropColumn("dbo.Coordinates", "Station_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Coordinates", "Station_Id", c => c.Int(nullable: false));
            DropForeignKey("dbo.Stations", "CoordinateId", "dbo.Coordinates");
            DropIndex("dbo.Stations", new[] { "CoordinateId" });
            AlterColumn("dbo.Tickets", "CheckInDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Tickets", "PurchaseDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Stations", "CoordinateId");
            CreateIndex("dbo.Coordinates", "Station_Id");
            AddForeignKey("dbo.Coordinates", "Station_Id", "dbo.Stations", "Id", cascadeDelete: true);
        }
    }
}
