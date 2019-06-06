using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public enum Days { working, saturday, sunday, holiday};
	public class Departure
	{
		public Departure()
		{
			this.Lines = new HashSet<Line>();
		}

		public int Id { get; set; }
		public string TimeOfDeparture { get; set; }
		public Days Day { get; set; }

		public virtual ICollection<Line> Lines { get; set; }
	}
}