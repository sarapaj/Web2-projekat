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
		IDiscountRepository Discounts { get; set; }
		ILineRepository Lines { get; set; }
		ILineStationConnectionRepository LineStationConnections { get; set; }
		IStationRepository Stations { get; set; }
		ITicketRepository Tickets { get; set; }
		ITicketTypeRepository TicketTypes { get; set; }
		IVehicleRepository Vehicles { get; set; }
		IApplicationUserRepository ApplicationUsers { get; set; }



		int Complete();
    }
}
