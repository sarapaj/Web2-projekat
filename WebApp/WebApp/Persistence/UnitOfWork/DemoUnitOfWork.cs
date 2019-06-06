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