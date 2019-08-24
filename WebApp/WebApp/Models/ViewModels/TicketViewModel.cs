using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.ViewModels
{
	public class TicketViewModel
	{
		public int id { get; set; }
		public string ticketType { get; set; }
		public string datePurchase { get; set; }
		public string checkInDate { get; set; }
	}
}