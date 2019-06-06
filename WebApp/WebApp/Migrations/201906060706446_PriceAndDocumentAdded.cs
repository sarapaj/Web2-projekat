namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PriceAndDocumentAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TicketTypes", "Price", c => c.Double(nullable: false));
            AddColumn("dbo.AspNetUsers", "Document", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Document");
            DropColumn("dbo.TicketTypes", "Price");
        }
    }
}
