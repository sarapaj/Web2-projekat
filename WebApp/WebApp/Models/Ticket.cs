using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class Ticket
	{
		public int Id { get; set; }
		public Nullable<System.DateTime> PurchaseDate { get; set; }
		public Nullable<System.DateTime> CheckInDate { get; set; }


		[ForeignKey("TicketType")]
		public int TicketTypeiD { get; set; }

		public int UserId { get; set; }

		public virtual ApplicationUser User { get; set; }
		public virtual TicketType TicketType { get; set; }
	}
}