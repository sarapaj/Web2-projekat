using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
	public class LineStationConnectionRepository : Repository<LineStationConnection, int>, ILineStationConnectionRepository
	{
		public LineStationConnectionRepository(DbContext dbContext) : base(dbContext) { }
	}
}