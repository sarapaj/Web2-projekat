using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
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

				bool rez;
				foreach (var user in users)
				{
					if (user.validDocument)
					{
						rez = true;
					}
					else
					{
						rez = false;
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
					user.validDocument = result;
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
