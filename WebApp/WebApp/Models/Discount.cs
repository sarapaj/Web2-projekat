using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class Discount
	{
		public int Id { get; set; }
		public string Type { get; set; }
		public int Percent { get; set; }
	}
}