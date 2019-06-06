using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
	public class LineStationConnection
	{
		public int RedniBroj { get; set; }
		public int Id { get; set; }

		[ForeignKey("Line")]
		public int Line_Id { get; set; }

		[ForeignKey("Station")]
		public int Station_Id { get; set; }

		public virtual Line Line { get; set; }
		public virtual Station Station { get; set; }
	}
}