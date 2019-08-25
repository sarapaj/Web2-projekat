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

		[Route("IsDocumentValid")]
		[ResponseType(typeof(bool))]
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

				bool rez = false;
				foreach (var user in users)
				{
					if (user.validDocument == ValidacijaDokumenta.prihvacen) // 0 procesiranje, 1 prihvacen, 2 odbijen
					{
						rez = true;
					}
					else
					{
						rez = false;
					}
				}

				return Ok(rez);
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

		[Route("CheckDocumentStatus")]
		[ResponseType(typeof(string))]
		[HttpGet]
		public IHttpActionResult CheckDocumentStatus(string userEmail)
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
					if (user.validDocument == ValidacijaDokumenta.procesiranje) // 0 procesiranje, 1 prihvacen, 2 odbijen
					{
						rez = "Procesiranje dokumenta je u toku";
					}
					else if (user.validDocument == ValidacijaDokumenta.prihvacen)
					{
						rez = "Dokument je validan";
					}
					else if (user.validDocument == ValidacijaDokumenta.odbijen)
					{
						rez = "Dokument nije validan";
					}
				}

				return Ok(rez);
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

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
					}
					else
					{
						user.validDocument = ValidacijaDokumenta.odbijen;
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


	}
}
