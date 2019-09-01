using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.ViewModels;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[Authorize]
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

		[AllowAnonymous]
		[Route("GetAllTickets")]
        [ResponseType(typeof(IEnumerable<TicketViewModel>))]
        [HttpGet]
        public IHttpActionResult GetAllTickets(string email)
        {
            var rez = new List<TicketViewModel>();

            try
            {
                var users = _unitOfWork.ApplicationUsers.Find(x => x.Email == email);
                foreach (var user in users)
                {
                    var tickets = _unitOfWork.Tickets.Find(x => x.UserId == user.Id);


                    foreach (var item in tickets)
                    {
                        TicketViewModel temp = new TicketViewModel();
                        temp.checkInDate = item.CheckInDate.ToString();
                        temp.datePurchase = item.PurchaseDate.ToString();
                        temp.ticketType = item.TicketType.Name;
                        temp.id = item.Id;

                        rez.Add(temp);
                    }
                }

                rez.Reverse();
                return Ok(rez);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }

		[AllowAnonymous]
        [Route("GetAllDiscounts")]
        [ResponseType(typeof(List<Discount>))]
        [HttpGet]
        public IHttpActionResult GetAllDiscounts()
        {
            try
            {
                return Ok(_unitOfWork.Discounts.GetAll());
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }


        [AllowAnonymous]
        [Route("GetAllTicketTypes")]
        [ResponseType(typeof(IEnumerable<TicketTypeViewModel>))]
        [HttpGet]
        public IHttpActionResult GetAllTicketTypes()
        {
            var rez = new List<TicketTypeViewModel>();

            try
            {
                var ticketTypes = _unitOfWork.TicketTypes.GetAll();

                foreach (var item in ticketTypes)
                {
                    rez.Add(new TicketTypeViewModel() { Id = item.Id, Name = item.Name, Price = item.Price });
                }

                return Ok(rez);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }


		[AllowAnonymous]
		[Route("GetUserRole")]
        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult GetUserRole(string Email)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var users = _unitOfWork.ApplicationUsers.Find(x => x.Email.ToString() == Email);

                if (users != null)
                {
                    foreach (var user in users)
                    {
                        if (user.Role.ToString() == "admin")
                            return Ok(2);
                        else if (user.Role.ToString() == "korisnik")
                            return Ok(1);
                        else if (user.Role.ToString() == "kontrolor")
                            return Ok(3);

                    }
                }


            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(HttpStatusCode.InternalServerError);
            }

            return NotFound();

        }


		[AllowAnonymous]
		[Route("GetTicketPrice")]
        [ResponseType(typeof(string))]
        [HttpGet]
        public IHttpActionResult GetTicketPrice(string TicketType, string PassengerType)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            double rez = 0;

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

                            rez = ticket.Price - ((ticket.Price * item.Percent) / 100);


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

		[AllowAnonymous]
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

		[AllowAnonymous]
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


		[AllowAnonymous]
		[Route("AddTicket")]
        [ResponseType(typeof(Ticket))]
        [HttpPost]
        public IHttpActionResult AddTicket(string ticketType, string email)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Ticket ticket = new Ticket();

            try
            {
                var ticketTypes = _unitOfWork.TicketTypes.Find(x => x.Name == ticketType);

                foreach (var type in ticketTypes)
                {
                    ticket.TicketType = type;
                    ticket.TicketTypeiD = type.Id;
                }

                var users = _unitOfWork.ApplicationUsers.Find(x => x.Email == email);
                foreach (var user in users)
                {
                    ticket.User = user;
                    ticket.UserId = user.Id;
                }

                ticket.PurchaseDate = DateTime.Now;
                ticket.CheckInDate = new DateTime(2000, 1, 1, 1, 1, 1);

                _unitOfWork.Tickets.Add(ticket);
                _unitOfWork.Complete();

            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.InternalServerError);
            }


            return Ok(ticket);
        }

		[Authorize(Roles = "Admin")]
        [Route("EditTicketPrice")]
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult EditTicketPrice()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            var idString = httpRequest.Form["Id"];
            var priceString = httpRequest.Form["Price"];

            if (idString == null || priceString == null)
            {
                return BadRequest();
            }

            double Price = Double.Parse(priceString);
            int Id = Int32.Parse(idString);
            

            try
			{
                var t = _unitOfWork.TicketTypes.Find(x => x.Id == Id);

                foreach (var ticket in t)
                {
                    ticket.Price = Price;
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

		[Authorize(Roles = "Admin")]
		[Route("EditDiscount")]
        [ResponseType(typeof(void))]
		[HttpPut]
		public IHttpActionResult EditDiscount()
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

            var httpRequest = HttpContext.Current.Request;
            var idString = httpRequest.Form["Id"];
            var percentString = httpRequest.Form["Percent"];

            if (idString == null || percentString == null)
            {
                return BadRequest();
            }

            int Id = Int32.Parse(idString);
            int Percent = Int32.Parse(percentString);

            try
            {
                var d = _unitOfWork.Discounts.Find(x => x.Id == Id);

                foreach (var discount in d)
                {
                    discount.Percent = Percent;
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
