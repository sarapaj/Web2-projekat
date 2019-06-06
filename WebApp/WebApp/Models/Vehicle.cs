using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class Vehicle
	{
		public Vehicle()
		{
			this.Lines = new HashSet<Line>();
		}

		public int Id { get; set; }

		public virtual ICollection<Line> Lines { get; set; }
	}
}