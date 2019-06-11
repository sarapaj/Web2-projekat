using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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
		public IHttpActionResult GetTicketPrice(string TicketType, string PassengerType) 
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			double rez;

			try
			{
				var tickets = _unitOfWork.TicketTypes.Find(x => x.Name.ToString() == TicketType);
				List<Discount> discounts = (List<Discount>)_unitOfWork.Discounts.GetAll();

				if (tickets != null)
				{
					foreach (var ticket in tickets)
					{
						foreach (var item in discounts)
						{
							if (item.Type.ToString() == PassengerType)
							{
								rez = ticket.Price - ticket.Price * (item.Percent / 100);

								return Ok(rez);
							}
						}
					}
				}
			}
			catch (DbUpdateConcurrencyException)
			{
				return StatusCode(HttpStatusCode.InternalServerError);
			}

			return NotFound();
		}

		[Route("GetTicketTypes")]
		[ResponseType(typeof(List<string>))]
		// GET: api/Line
		public IHttpActionResult GetTicketTypes()  
		{
			List<string> rez = new List<string>();

			try
			{
				List<TicketType> temp = (List<TicketType>)_unitOfWork.TicketTypes.GetAll();

				if (temp != null)
				{
					foreach (var item in temp)
					{
						rez.Add(item.Name);
					}

					return Ok(rez);
				}
			}
			catch (DbUpdateConcurrencyException)
			{
				return StatusCode(HttpStatusCode.InternalServerError);
			}

			return NotFound();
		}


		[Route("EditTicketPrice")]
		[ResponseType(typeof(void))]
		public IHttpActionResult EditTicketPrice(string type, double newPrice)   
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var t = _unitOfWork.TicketTypes.Find(x => x.Name.ToString() == type);

				foreach (var ticket in t)
				{
					ticket.Price = newPrice;
					_unitOfWork.TicketTypes.Update(ticket);
				}
				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return StatusCode(HttpStatusCode.InternalServerError);
			}

	
			return StatusCode(HttpStatusCode.NoContent);
		}


		[Route("EditDiscount")]
		[ResponseType(typeof(void))]
		public IHttpActionResult EditDiscount(string type, int newValue)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var d = _unitOfWork.Discounts.Find(x => x.Type.ToString() == type);

				foreach (var discount in d)
				{
					discount.Percent = newValue;
					_unitOfWork.Discounts.Update(discount);
				}
				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return StatusCode(HttpStatusCode.InternalServerError);
			}


			return StatusCode(HttpStatusCode.NoContent);
		}


    }
}
