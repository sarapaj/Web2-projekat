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


		[Route("GetTicketPrice")]
		[ResponseType(typeof(string))]
		[HttpGet]
		public IHttpActionResult GetTicketPrice(string TicketType, string PassengerType) 
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			double rez=0;

			try
			{
				var tickets = _unitOfWork.TicketTypes.Find(x => x.Name.ToString() == TicketType);
				var discounts = _unitOfWork.Discounts.Find(x => x.Type.ToString() == PassengerType);

				if (tickets != null)
				{
					foreach (var ticket in tickets)
					{
						foreach (var item in discounts)
						{
							
							rez = ticket.Price - ((ticket.Price * item.Percent )/ 100);

							
						}
					}
					return Ok(rez.ToString());

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
		[HttpGet]
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

		[Route("GetPassengerTypes")]
		[ResponseType(typeof(List<string>))]
		[HttpGet]
		public IHttpActionResult GetPassengerTypes()
		{
			List<string> rez = new List<string>();

			try
			{
				List<Discount> temp = (List<Discount>)_unitOfWork.Discounts.GetAll();

				if (temp != null)
				{
					foreach (var item in temp)
					{
						rez.Add(item.Type);
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

		[Route("ValidateTicket")]
		[ResponseType(typeof(bool))]
		[HttpGet]
		public IHttpActionResult ValidateTicket(int ticketID)
		{
			try
			{
				var ticket = _unitOfWork.Tickets.Get(ticketID);

				if (ticket.TicketType.ToString() == "vremenska")
				{
					
				}
				else if (ticket.TicketType.ToString() == "dnevna")
				{

				}
				else if (ticket.TicketType.ToString() == "mesecna")
				{

				}
				else if (ticket.TicketType.ToString() == "godisnja")
				{

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
		[HttpPut]
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


		[Route("AddTicket")]
		[ResponseType(typeof(Ticket))]
		[HttpPost]
		public IHttpActionResult AddTicket(Ticket ticket)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				_unitOfWork.Tickets.Add(ticket);
				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return StatusCode(HttpStatusCode.InternalServerError);
			}


			return Ok(ticket);
		}



		[Route("EditDiscount")]
		[ResponseType(typeof(void))]
		[HttpPut]
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
