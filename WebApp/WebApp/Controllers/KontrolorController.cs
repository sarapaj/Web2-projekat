using MimeKit;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.ViewModels;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[Authorize]
	[RoutePrefix("api/Kontrolor")]
	public class KontrolorController : ApiController
    {
		// GET: api/Kontrolor
		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public KontrolorController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}

		[AllowAnonymous]
		[Route("GetImage")]
		[ResponseType(typeof(File))]
		[HttpGet]
		public async Task<IHttpActionResult> GetImage(string userEmail)
		{
			try
			{
				var users = _unitOfWork.ApplicationUsers.Find(x => x.Email.ToString() == userEmail);

				string image = "";
				foreach (var user in users)
				{
					image = user.Document;
				}                

                Byte[] b = System.IO.File.ReadAllBytes(image);   // You can use your own method over here.         

				return Ok(b);
			}
			catch (Exception e)
			{
				return BadRequest();
			}
		}
        

		[AllowAnonymous]
		[Route("GetDocument")]
		[ResponseType(typeof(string))]
		[HttpGet]
		public IHttpActionResult GetDocument(string userEmail)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var users = _unitOfWork.ApplicationUsers.Find(x => x.Email.ToString() == userEmail);

				string image = "";
				foreach (var user in users)
				{
					image = user.Document;
				}
				
				return Ok(image);
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

		[Authorize(Roles = "Controller")]
		[Route("GetUsersToValidate")]
		[ResponseType(typeof(List<UserInfoViewModel>))]
		[HttpGet]
		public IHttpActionResult GetUsersToValidate()
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var users = _unitOfWork.ApplicationUsers.GetAll();

				List<UserViewModel> userList = new List<UserViewModel>();

				foreach (var user in users)
				{
					if (user.Document != null && user.validDocument == ValidacijaDokumenta.procesiranje)
					{
						userList.Add(new UserViewModel()
						{
							Document = user.Document,
							documentStatus = Enum.GetName(user.validDocument.GetType(), user.validDocument),
							Type = Enum.GetName(user.Type.GetType(), user.Type),
							Name = user.Name,
							LastName = user.Lastname,
							Email = user.Email,
							id = user.Id
						});
					}
				}

				return Ok(userList);
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

		[AllowAnonymous]
		[Route("IsDocumentValid")]
		[ResponseType(typeof(string))]
		[HttpGet]
		public IHttpActionResult IsDocumentValid(string userEmail)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var users = _unitOfWork.ApplicationUsers.Find(x => x.Email.ToString() == userEmail);

				string rez = "";
				foreach (var user in users)
				{
					if (user.validDocument == ValidacijaDokumenta.prihvacen) // 0 procesiranje, 1 prihvacen, 2 odbijen
					{
						rez = "Prihvacen";
					}
					else if (user.validDocument == ValidacijaDokumenta.odbijen)
                    {
						rez = "Odbijen";
					}
                    else if (user.validDocument == ValidacijaDokumenta.procesiranje)
                    {
                        rez = "Procesiranje";
                    }
                    else
                    {
                        rez = "Nedefinisan";
                    }
                }

				return Ok(rez);
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

		//[AllowAnonymous]
		//[Route("CheckDocumentStatus")]
		//[ResponseType(typeof(string))]
		//[HttpGet]
		//public IHttpActionResult CheckDocumentStatus(string userEmail)
		//{
		//	if (!ModelState.IsValid)
		//	{
		//		return BadRequest(ModelState);
		//	}

		//	try
		//	{
		//		var users = _unitOfWork.ApplicationUsers.Find(x => x.Email.ToString() == userEmail);

		//		string rez = "";
		//		foreach (var user in users)
		//		{
		//			if (user.validDocument == ValidacijaDokumenta.procesiranje) // 0 procesiranje, 1 prihvacen, 2 odbijen
		//			{
		//				rez = "Procesiranje dokumenta je u toku";
		//			}
		//			else if (user.validDocument == ValidacijaDokumenta.prihvacen)
		//			{
		//				rez = "Dokument je validan";
		//			}
		//			else if (user.validDocument == ValidacijaDokumenta.odbijen)
		//			{
		//				rez = "Dokument nije validan";
		//			}
		//		}

		//		return Ok(rez);
		//	}
		//	catch (DbUpdateConcurrencyException)
		//	{
		//		return NotFound();
		//	}
		//}

		[Authorize(Roles = "Controller")]
		[Route("ValidateTicket")]
		[ResponseType(typeof(bool))]
		[HttpGet]
		public IHttpActionResult ValidateTicket(int ticketID) //to do proveri da li korisnik radi checkin ??
		{
			try
			{
				var tickets = _unitOfWork.Tickets.Find(x => x.Id == ticketID);
				DateTime temp2 = DateTime.Now;

				foreach (var ticket in tickets)
				{

					if (ticket.TicketType.Name == "Vremenska")
					{
						DateTime temp = ticket.PurchaseDate.Value.AddMinutes(60);

						if (ticket.CheckInDate > temp2)
						{
							return Ok(false);
						}
						else
						{
							return Ok(true);
						}
					}
					else if (ticket.TicketType.Name == "Dnevna")
					{
						DateTime temp = ticket.PurchaseDate.Value.AddDays(1);

						if (ticket.CheckInDate > temp2)
						{
							return Ok(false);
						}
						else
						{
							return Ok(true);
						}
					}
					else if (ticket.TicketType.Name == "Mesecna")
					{
						DateTime temp = ticket.PurchaseDate.Value.AddMonths(1);

						if (ticket.CheckInDate > temp2)
						{
							return Ok(false);
						}
						else
						{
							return Ok(true);
						}
					}
					else if (ticket.TicketType.Name == "Godisnja")
					{
						DateTime temp = ticket.PurchaseDate.Value.AddYears(1);

						if (ticket.CheckInDate > temp2)
						{
							return Ok(false);
						}
						else
						{
							return Ok(true);
						}
					}
				}
			}
			catch (DbUpdateConcurrencyException)
			{
				return StatusCode(HttpStatusCode.InternalServerError);
			}

			return Ok(false);
		}


		[Authorize(Roles = "Controller")]
		[Route("ValidateDocument")]
		[ResponseType(typeof(bool))]
		[HttpPost]
		public IHttpActionResult ValidateDocument(string userEmail, bool result)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var users = _unitOfWork.ApplicationUsers.Find(x => x.Email.ToString() == userEmail);

				foreach (var user in users)
				{
					if (result)
					{
						user.validDocument = ValidacijaDokumenta.prihvacen;
                        if (!SendEmail(userEmail, "prihvacen"))
                        {
                            return InternalServerError();
                        }
                    }
					else
					{
						user.validDocument = ValidacijaDokumenta.odbijen;
                        if (!SendEmail(userEmail, "odbijen"))
                        {
                            return InternalServerError();
                        }
                    }

					_unitOfWork.ApplicationUsers.Update(user);
				}
				_unitOfWork.Complete();

				return Ok(true);
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

		public bool SendEmail(string userEmail, string status)
		{
            SmtpClient client = new SmtpClient();
            //client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;

            //// setup Smtp authentication
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("web2projekat@gmail.com", "web2projekat1234");
            client.UseDefaultCredentials = true;
            client.Credentials = credentials;

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("web2projekat@gmail.com");
            msg.To.Add(new MailAddress(userEmail));

            msg.Subject = "Rezultat validacije dokumenta";
            msg.Body = string.Format("Zahtev je " + status);
            msg.IsBodyHtml = false;

            try
            {
                client.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
             
        }
    }
}
