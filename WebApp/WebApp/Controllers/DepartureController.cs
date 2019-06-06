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
    public class DepartureController : ApiController
    {
		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public DepartureController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}


		// GET: api/Departure
		public IEnumerable<Departure> GetAll()
        {
			return _unitOfWork.Departures.GetAll();
		}


		// GET: api/Departure/5
		[ResponseType(typeof(Departure))]
		public IHttpActionResult GetItem(int id)
		{
			Departure departure = _unitOfWork.Departures.Get(id);
			if (departure == null)
			{
				return NotFound();
			}

			return Ok(departure);
		}


		// POST: api/Departure
		[ResponseType(typeof(Departure))]
		public IHttpActionResult PostDepartureItem(Departure departure)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_unitOfWork.Departures.Add(departure);
			_unitOfWork.Complete();

			return CreatedAtRoute("DefaultApi", new { id = departure.Id }, departure);
		}


		// PUT: api/Departure/5
		[ResponseType(typeof(void))]
		public IHttpActionResult PutDepartureItem(int id, Departure departure)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != departure.Id)
			{
				return BadRequest();
			}

			try
			{
				_unitOfWork.Departures.Update(departure);
				_unitOfWork.Complete();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!DepartureItemExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return StatusCode(HttpStatusCode.NoContent);
		}


		// DELETE: api/Departure/5
		[ResponseType(typeof(Departure))]
		public IHttpActionResult DeleteDeparture(int id)
		{
			Departure departure = _unitOfWork.Departures.Get(id);
			if (departure == null)
			{
				return NotFound();
			}

			_unitOfWork.Departures.Remove(departure);
			_unitOfWork.Complete();

			return Ok(departure);
		}


		private bool DepartureItemExists(int id)
		{
			return _unitOfWork.Departures.Get(id) != null;
		}
	}
}
