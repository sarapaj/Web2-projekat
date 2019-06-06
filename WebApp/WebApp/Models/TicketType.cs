using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class TicketType
	{
		public TicketType()
		{
			this.Tickets = new HashSet<Ticket>();
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public double Price { get; set; }

		public virtual ICollection<Ticket> Tickets { get; set; }
	}
}