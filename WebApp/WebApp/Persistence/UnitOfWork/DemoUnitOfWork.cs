using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Unity;
using WebApp.Models;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

		[Dependency]
		public IDepartureRepository Departures { get; set; }

		[Dependency]
		public ICoordinateRepository Coordinates { get; set; }

		[Dependency]
		public IDiscountRepository Discounts { get; set; }

		[Dependency]
		public ILineRepository Lines { get; set; }

		[Dependency]
		public ILineStationConnectionRepository LineStationConnections { get; set; }

		[Dependency]
		public IStationRepository Stations { get; set; }

		[Dependency]
		public ITicketRepository Tickets { get; set; }

		[Dependency]
		public ITicketTypeRepository TicketTypes { get; set; }

		[Dependency]
		public IVehicleRepository Vehicles { get; set; }

		[Dependency]
		public IApplicationUserRepository ApplicationUsers { get; set; }


		public IProductRepository Products { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }


		public DemoUnitOfWork(DbContext context)
		{
			_context = context;
		}

		public int Complete()
		{
			return _context.SaveChanges();
		}

		public void Dispose()
		{
			_context.Dispose();
		}
	}
}