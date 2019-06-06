namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InititalDataBase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Coordinates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        x = c.Int(nullable: false),
                        y = c.Int(nullable: false),
                        Station_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .Index(t => t.Station_Id);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LineStationConnections",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RedniBroj = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                        Station_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .Index(t => t.Line_Id)
                .Index(t => t.Station_Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Region = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Departures",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TimeOfDeparture = c.DateTime(nullable: false),
                        Day = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Discounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        Percent = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
      
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PurchaseDate = c.DateTime(nullable: false),
                        CheckInDate = c.DateTime(nullable: false),
                        TicketTypeiD = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeiD, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.TicketTypeiD)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.TicketTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            
            CreateTable(
                "dbo.DepartureLines",
                c => new
                    {
                        Departure_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Departure_Id, t.Line_Id })
                .ForeignKey("dbo.Departures", t => t.Departure_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Departure_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.VehicleLines",
                c => new
                    {
                        Vehicle_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Vehicle_Id, t.Line_Id })
                .ForeignKey("dbo.Vehicles", t => t.Vehicle_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Vehicle_Id)
                .Index(t => t.Line_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Tickets", "TicketTypeiD", "dbo.TicketTypes");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Coordinates", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.LineStationConnections", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.LineStationConnections", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.VehicleLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.VehicleLines", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.DepartureLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.DepartureLines", "Departure_Id", "dbo.Departures");
            DropIndex("dbo.VehicleLines", new[] { "Line_Id" });
            DropIndex("dbo.VehicleLines", new[] { "Vehicle_Id" });
            DropIndex("dbo.DepartureLines", new[] { "Line_Id" });
            DropIndex("dbo.DepartureLines", new[] { "Departure_Id" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Tickets", new[] { "User_Id" });
            DropIndex("dbo.Tickets", new[] { "TicketTypeiD" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.LineStationConnections", new[] { "Station_Id" });
            DropIndex("dbo.LineStationConnections", new[] { "Line_Id" });
            DropIndex("dbo.Coordinates", new[] { "Station_Id" });
            DropTable("dbo.VehicleLines");
            DropTable("dbo.DepartureLines");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.TicketTypes");
            DropTable("dbo.Tickets");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Discounts");
            DropTable("dbo.Vehicles");
            DropTable("dbo.Departures");
            DropTable("dbo.Lines");
            DropTable("dbo.LineStationConnections");
            DropTable("dbo.Stations");
            DropTable("dbo.Coordinates");
        }
    }
}
