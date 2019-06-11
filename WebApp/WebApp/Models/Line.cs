using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public enum Regions { gradski, prigradski }
	public class Line
	{
		public Line()
		{
			this.LineStationConnections = new HashSet<LineStationConnection>();
			this.Departures = new HashSet<Departure>();
			this.Vehicles = new HashSet<Vehicle>();
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public Regions Region { get; set; }

		public virtual ICollection<LineStationConnection> LineStationConnections { get; set; }
		public virtual ICollection<Departure> Departures { get; set; }
		public virtual ICollection<Vehicle> Vehicles { get; set; }
	}
}