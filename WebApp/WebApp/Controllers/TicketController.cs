using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/Ticket")]
	public class TicketController : ApiController
    {
		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public TicketController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}

		// GET: api/Ticket
		public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

		[Route("GetTicketPrice")]
		[ResponseType(typeof(double))]
		// GET: api/Line
		public IHttpActionResult GetTicketPrice(string TicketType, string PassengerType)  //vraca imena svih linija kao string 
		{
			double rez;

			TicketType ticket = (TicketType)_unitOfWork.TicketTypes.Find(x => x.Name == TicketType);
			List<Discount> discounts = (List<Discount>)_unitOfWork.Discounts.GetAll();

			if (ticket != null)
			{
				foreach (var item in discounts)
				{
					if (item.Type == PassengerType)
					{
						rez = ticket.Price - ticket.Price * (item.Percent / 100);

						return Ok(rez);
					}
				}
			}

		
			return NotFound();
		}

		[Route("GetTicketTypes")]
		[ResponseType(typeof(List<string>))]
		// GET: api/Line
		public IHttpActionResult GetTicketTypes()  //vraca imena svih linija kao string 
		{
			List<string> rez = new List<string>();

			List<TicketType> temp = (List<TicketType>)_unitOfWork.TicketTypes.GetAll();

			if (temp != null)
			{
				foreach (var item in temp)
				{
					rez.Add(item.Name);
				}

				return Ok(rez);
			}


			return NotFound();
		}

		// GET: api/Ticket/5
		public string Get(int id)
        {
            return "value";
        }

        // POST: api/Ticket
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Ticket/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Ticket/5
        public void Delete(int id)
        {
        }
    }
}
