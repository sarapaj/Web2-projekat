using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class Coordinate
	{
		public Coordinate()
		{
			this.Stations = new HashSet<Station>();
		}

		public int Id { get; set; }
		public int x { get; set; }
		public int y { get; set; }


		public virtual ICollection<Station> Stations { get; set; }

	}
}