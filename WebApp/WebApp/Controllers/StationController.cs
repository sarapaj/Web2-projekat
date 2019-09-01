using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[Authorize]
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


		[AllowAnonymous]
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

		[AllowAnonymous]
		[Route("GetStationNames")]
        [ResponseType(typeof(List<string>))]
        [HttpGet]
        public IHttpActionResult GetStationNames()  //vraca imena svih stanica za dropdown meni  
        {
            try
            {
                List<string> rez = new List<string>();
                List<Station> temp = (List<Station>)_unitOfWork.Stations.GetAll();

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
                return NotFound();
            }

            return NotFound();
        }

		[AllowAnonymous]
		[Route("GetStationByName")]
        [ResponseType(typeof(Station))]
        [HttpGet]
        public IHttpActionResult GetStationByName(string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var stations = _unitOfWork.Stations.Find(x => x.Name.ToString() == name);


                foreach (var st in stations)
                {
                    if (st != null)
                    {
                        return Ok(st);
                    }
                }

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NotFound();
        }

		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
		[Route("EditStation")]
		[HttpPut]
		public IHttpActionResult EditStation()
		{
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            var idString = httpRequest.Form["Id"];
            int Id = Int32.Parse(idString);
            var Name = httpRequest.Form["Name"];
            var Address = httpRequest.Form["Address"];

            try
            {
                var stations = _unitOfWork.Stations.Find(x => x.Id == Id);


                foreach (var st in stations)
                {
                    if (st != null)
                    {
                        st.Name = Name;
                        st.Address = Address;
                        try
                        {
                            _unitOfWork.Stations.Update(st);
                        }
                        catch (DbUpdateConcurrencyException)
                        {
                            return NotFound();
                        }

                    }
                }
                _unitOfWork.Complete();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }


		[Authorize(Roles = "Admin")]
		[Route("AddStation")]
        [ResponseType(typeof(Station))]
        [HttpPost]
        public IHttpActionResult AddStation()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Station station = new Station();
            Coordinate coord = new Coordinate();
            
            var httpRequest = HttpContext.Current.Request;
            var name = httpRequest.Form["Name"];
            var address = httpRequest.Form["Address"];
            var coordIdStr = httpRequest.Form["coordId"];

            if (name == null || address == null || coordIdStr == null)
            {
                return BadRequest();
            }

            station.Name = name;
            station.Address = address;
            int coordId = Int32.Parse(coordIdStr);
            station.CoordinateId = coordId;

            try
            {
                var coordinates = _unitOfWork.Coordinates.Find(x => x.Id == coordId);


                if (coordinates != null)
                {
                    foreach (var c in coordinates)
                    {
                        station.Coordinate = c;

                    }
                }

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            try
            {
                _unitOfWork.Stations.Add(station);
                _unitOfWork.Complete();

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok(station);
        }


		[Authorize(Roles = "Admin")]
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
                    foreach(var station in stations)
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

		[Authorize(Roles = "Admin")]
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


		[Authorize(Roles = "Admin")]
		[Route("AddCoordinate")]
        [ResponseType(typeof(Coordinate))]
        [HttpPost]
        public IHttpActionResult AddCordinate()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coordinate coord = new Coordinate();

            var httpRequest = HttpContext.Current.Request;
            var xStr = httpRequest.Form["xCoord"];
            var yStr = httpRequest.Form["yCoord"];

            if (xStr == null || yStr == null)
            {
                return BadRequest();
            }

            int y = Int32.Parse(yStr);
            int x = Int32.Parse(xStr);

            coord.x = x;
            coord.y = y;

            try
            {
                _unitOfWork.Coordinates.Add(coord);
                _unitOfWork.Complete();

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok(coord);
        }

		[AllowAnonymous]
		[Route("GetAllCoordinates")]
        [ResponseType(typeof(List<Coordinate>))]
        [HttpGet]
        public IHttpActionResult GetAllCoordinates()
        {
            try
            {
                return Ok(_unitOfWork.Coordinates.GetAll());
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }
    }
}
