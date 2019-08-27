using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.ViewModels
{
	public class UserViewModel
	{
		public string id { get; set; }
		public string Document { get; set; }
		public string Type { get; set; }
		public string Name { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string documentStatus { get; set; }
	}
}