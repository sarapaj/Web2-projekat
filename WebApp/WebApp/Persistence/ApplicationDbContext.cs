using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebApp.Models;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        //DbSet<Product> Products { get; set; }
		DbSet<Coordinate> Coordinates { get; set; }
		DbSet<Departure> Departures { get; set; }
		DbSet<Discount> Discounts { get; set; }
		DbSet<Line> Lines { get; set; }
		DbSet<LineStationConnection> LineStationConnections { get; set; }
		DbSet<Station> Stations { get; set; }
		DbSet<Ticket> Tickets { get; set; }
		DbSet<TicketType> TicketTypes { get; set; }
		DbSet<Vehicle> Vehicles { get; set; }


		public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}