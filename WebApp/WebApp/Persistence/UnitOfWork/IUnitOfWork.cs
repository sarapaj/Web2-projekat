using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; set; }
		IDepartureRepository Departures { get; set; }
		ICoordinateRepository Coordinates { get; set; }


		int Complete();
    }
}
