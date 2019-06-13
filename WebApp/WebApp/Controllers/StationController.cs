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
		[ResponseType(typeof(List<Station>))]
		[HttpGet]
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
		[HttpPut]
		public IHttpActionResult EditStation(string name, string newName, string newAddress)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			//if (name != station.Name)
			//{
			//	return BadRequest();
			//}

			try
			{
				var temp = _unitOfWork.Stations.Find(x => x.Name == name);
				foreach (var item in temp)
				{
					item.Name = newName;
					item.Address = newAddress;
					_unitOfWork.Stations.Update(item);
					_unitOfWork.Complete();
				}
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return StatusCode(HttpStatusCode.NoContent);
		}

		[Route("DeleteStation")]
		[ResponseType(typeof(Station))]
		[HttpDelete]
		public IHttpActionResult DeleteStation(string name)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var stations = _unitOfWork.Stations.Find(x => x.Name == name);

                
                if (stations != null)
                {
                    foreach (var station in stations)
                    {
                        _unitOfWork.Stations.Remove(station);
                        
                    }

                    _unitOfWork.Complete();
                    return Ok(stations);
                }

                
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return NotFound();

		}


		[Route("AddStationToLine")]
		[ResponseType(typeof(LineStationConnection))]
		[HttpPost]
		public IHttpActionResult AddExistingStationToLine(string lineName, string stationName, int redniBroj)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			LineStationConnection conn = new LineStationConnection();

			try
			{
				var lines = _unitOfWork.Lines.Find(x => x.Name.ToString() == lineName);
				var stations = _unitOfWork.Stations.Find(x => x.Name.ToString() == stationName);


				foreach (var line in lines)
				{
					conn.Line = line;
					conn.Line_Id = line.Id;

				}

				foreach (var station in stations)
				{
					conn.Station = station;
					conn.Station_Id = station.Id;
				}

				conn.RedniBroj = redniBroj;

				_unitOfWork.LineStationConnections.Add(conn);
				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return Ok(conn);
		}

		
    }
}
