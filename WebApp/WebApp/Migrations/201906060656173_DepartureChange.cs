namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DepartureChange : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Departures", "TimeOfDeparture", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Departures", "TimeOfDeparture", c => c.DateTime(nullable: false));
        }
    }
}
