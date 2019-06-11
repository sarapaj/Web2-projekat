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
	[RoutePrefix("api/Station")]
	public class StationController : ApiController
    {

		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public StationController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}


		[Route("GetAll")]
		[ResponseType(typeof(List<Line>))]
		public IHttpActionResult GetAll()
		{
			try
			{
				return Ok(_unitOfWork.Stations.GetAll());
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}


		[ResponseType(typeof(void))]
		[Route("EditStation")]
		public IHttpActionResult EditStation(string name, Station station)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (name != station.Name)
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
				return NotFound();
			}

			return StatusCode(HttpStatusCode.NoContent);
		}

		[Route("DeleteStation")]
		[ResponseType(typeof(Line))]
		public IHttpActionResult DeleteStation(string name)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				Station station = (Station)_unitOfWork.Stations.Find(x => x.Name == name);
				if (station != null)
				{
					_unitOfWork.Stations.Remove(station);
					_unitOfWork.Complete();

					return Ok(station);
				}
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return NotFound();

		}


		[Route("AddStationToLine")]
		[ResponseType(typeof(void))]
		public IHttpActionResult AddExistingStationToLine(Line line, Station station, int redniBroj)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				Line l = (Line)_unitOfWork.Lines.Find(x => x.Name == line.Name);
				Station s = (Station)_unitOfWork.Stations.Find(x => x.Name == station.Name);

				LineStationConnection conn = new LineStationConnection();
				conn.Line = l;
				conn.Line_Id = l.Id;
				conn.Station = s;
				conn.Station_Id = s.Id;


				_unitOfWork.LineStationConnections.Add(conn);
				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
		}

		
    }
}
