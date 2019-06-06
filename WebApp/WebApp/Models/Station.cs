using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class Station
	{
		public Station()
		{
			this.LineStationConnections = new HashSet<LineStationConnection>();
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }


		[ForeignKey("Coordinate")]
		public int CoordinateId { get; set; }
		public virtual Coordinate Coordinate { get; set; }

		public virtual ICollection<LineStationConnection> LineStationConnections { get; set; }
	}
}