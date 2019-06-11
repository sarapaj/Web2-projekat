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
    public class StationController : ApiController
    {

		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public StationController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}


		// GET: api/Station
		public IEnumerable<Station> GetAll()
		{
			return _unitOfWork.Stations.GetAll();
		}

		// GET: api/Station/5
		[ResponseType(typeof(Station))]
		public IHttpActionResult GetItem(int id)
		{
			Station station = _unitOfWork.Stations.Get(id);
			if (station == null)
			{
				return NotFound();
			}

			
			return Ok(station);
		}

		// POST: api/Station
		[ResponseType(typeof(Station))]
		public IHttpActionResult PostItem(Station station)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_unitOfWork.Stations.Add(station);
			_unitOfWork.Complete();

			return CreatedAtRoute("DefaultApi", new { id = station.Id }, station);
		}

		// PUT: api/Station/5
		[ResponseType(typeof(void))]
		public IHttpActionResult PutItem(int id, Station station)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != station.Id)
			{
				return BadRequest();
			}

			try
			{
				_unitOfWork.Stations.Update(station);
				_unitOfWork.Complete();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!StationItemExists(id))
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

		// DELETE: api/Station/5
		[ResponseType(typeof(Station))]
		public IHttpActionResult Delete(int id)
		{
			Station station = _unitOfWork.Stations.Get(id);
			if (station == null)
			{
				return NotFound();
			}

			_unitOfWork.Stations.Remove(station);
			_unitOfWork.Complete();

			return Ok(station);
		}


		private bool StationItemExists(int id)
		{
			return _unitOfWork.Stations.Get(id) != null;
		}
	}
}
