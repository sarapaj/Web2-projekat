using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[Authorize]
	[RoutePrefix("api/Line")]
	public class LineController : ApiController
    {
		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public LineController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}

		[AllowAnonymous]
		[Route("GetAll")]
		[ResponseType(typeof(List<Line>))]
		[HttpGet]
		public IHttpActionResult GetAllLines()
		{
			try
			{
				return Ok(_unitOfWork.Lines.GetAll());
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}
		}

        [AllowAnonymous]
        [Route("GetBelongingStations")]
        [ResponseType(typeof(List<string>))]
        [HttpGet]
        public IHttpActionResult GetBelongingStations(int lineId)
        {
            try
            {
                List<string> stations = new List<string>();
                var line = _unitOfWork.Lines.Get(lineId);

                if (line != null)
                {
                    foreach(var item in line.LineStationConnections)
                    {
                        stations.Add(item.Station.Name);
                    }

                    return Ok(stations);
                }

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NotFound();
        }

        [AllowAnonymous]
        [Route("GetNotBelongingStations")]
        [ResponseType(typeof(List<Station>))]
        [HttpGet]
        public IHttpActionResult GetNotBelongingStations(int lineId)
        {
            try
            {
                List<Station> notBelongingStations = new List<Station>();
                var line = _unitOfWork.Lines.Get(lineId);
                List<int> belongingStationsIds = new List<int>();

                if (line != null)
                {
                    foreach (var linesStation in line.LineStationConnections)
                    {
                        belongingStationsIds.Add(linesStation.Station.Id);
                    }
                    
                    foreach (var station in _unitOfWork.Stations.GetAll())
                    {
                        if (!belongingStationsIds.Contains(station.Id))
                        {
                            notBelongingStations.Add(station);
                        }
                    }

                    return Ok(notBelongingStations);
                }

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("GetNotBelongingStations not working");
            }

            return NotFound();
        }

        [AllowAnonymous]
        [Route("GetLineStations")]
        [ResponseType(typeof(List<Station>))]
        [HttpGet]
        public IHttpActionResult GetLineStations(string lineName)
        {
            try
            {
                List<Station> stations = new List<Station>();
                var line = _unitOfWork.Lines.Find(x => x.Name == lineName).FirstOrDefault();

                if (line != null)
                {
                    foreach (var item in line.LineStationConnections)
                    {
                        stations.Add(item.Station);
                    }

                    return Ok(stations);
                }

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NotFound();
        }

        [AllowAnonymous]
        [Route("AddStationToLine")]
        [ResponseType(typeof(LineStationConnection))]
        [HttpPost]
        public IHttpActionResult AddExistingStationToLine()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            var stationName = httpRequest.Form["StationName"];
            var lineId = Int32.Parse(httpRequest.Form["LineId"]);

            LineStationConnection conn = new LineStationConnection();

            try
            {
                var line = _unitOfWork.Lines.Find(x => x.Id == lineId).FirstOrDefault();
                var station = _unitOfWork.Stations.Find(x => x.Name.ToString() == stationName).FirstOrDefault();

                conn.Line = line;
                conn.Line_Id = line.Id;

                conn.Station = station;
                conn.Station_Id = station.Id;


                conn.RedniBroj = line.LineStationConnections.Count() + 1;

                _unitOfWork.LineStationConnections.Add(conn);
                _unitOfWork.Complete();

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok(conn);
        }

        [AllowAnonymous]
        [Route("RemoveStationFromLine")]
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult AddStationToLine()  //izmena polazaka za admina
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            var stationName = httpRequest.Form["StationName"];
            var lineId = Int32.Parse(httpRequest.Form["LineId"]);

            try
            {

                var station = _unitOfWork.Stations.Find(x => x.Name == stationName).FirstOrDefault();
                var LineStationEntity = _unitOfWork.LineStationConnections.Find(x => x.Line_Id == lineId && x.Station_Id == station.Id).FirstOrDefault();

                if (LineStationEntity != null)
                {
                    _unitOfWork.LineStationConnections.Remove(LineStationEntity);
                }

                _unitOfWork.Complete();

                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }

        [AllowAnonymous]
        [Route("GetLineNames")]
		[ResponseType(typeof(List<string>))]
		[HttpGet]
		public IHttpActionResult GetLineNames()  //vraca imena svih linija za dropdown meni  
		{
			try
			{
				List<string> rez = new List<string>();
				List<Line> temp = (List<Line>)_unitOfWork.Lines.GetAll();

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
		[Route("GetDepartures")]
		[ResponseType(typeof(IEnumerable<string>))]
		[HttpGet]
		public IHttpActionResult GetDepartures(string day, string lineName)  //vraca polaske za konkretnu liniju
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			List<string> result = new List<string>();

			try
			{
				Days dayEnum = ParseEnum<Days>(day);
				var lines = _unitOfWork.Lines.Find(x => x.Name == lineName);

				if (lines != null)
				{
					foreach (var temp in lines)
					{
						foreach (var item in temp.Departures)
						{
							if (item.Day == dayEnum)
							{
								var tempList = item.TimeOfDeparture.Split(new char[] { ',' }).ToList();
								foreach (var dep in tempList)
								{
									result.Add(dep);
								}

							}
						}
					}
				}

				return Ok(result);

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

		}
        
        [Authorize(Roles = "Admin")]
        [Route("EditDepartures")]
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult EditDepartures()  //izmena polazaka za admina
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var httpRequest = HttpContext.Current.Request;
            var day = httpRequest.Form["Day"];
            var lineName = httpRequest.Form["Line"];
            var newDepartures = httpRequest.Form["NewDeparture"];

            try
            {
                Days dayEnum = ParseEnum<Days>(day);
                var lines = _unitOfWork.Lines.Find(x => x.Name == lineName);
                if (lines != null)
                {
                    foreach (var temp in lines)
                    {
                        foreach (var item in temp.Departures)
                        {
                            if (item.Day == dayEnum)
                            {
                                item.TimeOfDeparture = newDepartures;
                                _unitOfWork.Lines.Update(temp);
                            }
                        }
                    }
                    _unitOfWork.Complete();
                    return Ok();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return NotFound();
        }
        
		[AllowAnonymous]
		[Route("GetLineByName")]
		[ResponseType(typeof(Line))]
		[HttpGet]
		public IHttpActionResult GetLineByName(string name)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var lines = _unitOfWork.Lines.Find(x => x.Name.ToString() == name);


                foreach(var line in lines)
                {
                    if (line != null)
                    {
                        return Ok(line);
                    }
                }

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return NotFound();
		}


		// POST: api/Line
		[Authorize(Roles = "Admin")]
		[Route("AddLine")]
		[ResponseType(typeof(Line))]
		[HttpPost]
		public IHttpActionResult AddLine(Line line)
		{
            //Line line = new Line();
            //line.Name = name;
            //line.Region = (Regions)region;

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				_unitOfWork.Lines.Add(line);
				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return Ok(line);
		}
        
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
		[Route("AddDeparture")]
		[HttpPost]
		public IHttpActionResult AddDeparture()
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

            var httpRequest = HttpContext.Current.Request;
            var day = httpRequest.Form["Day"];
            var lineName = httpRequest.Form["Line"];
            var departures = httpRequest.Form["NewDeparture"];

            try
			{
				var lines = _unitOfWork.Lines.Find(x => x.Name.ToString() == lineName);

				foreach (var line in lines)
				{
					Departure departure = new Departure();
					departure.TimeOfDeparture = departures;
					Days tempDay; 
					Enum.TryParse(day, out tempDay);
					departure.Day = tempDay;
					departure.Lines.Add(line);

					_unitOfWork.Departures.Add(departure);
					line.Departures.Add(departure);

					_unitOfWork.Lines.Update(line);
				}

				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return StatusCode(HttpStatusCode.NoContent);
		}
        
		[Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
		[Route("DeleteDepartures")]
		[HttpDelete]
		public IHttpActionResult DeleteDepartures(string lineName, string day) //radni, neradni, praznik...iz enum Days
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

            Days tempDay;
            Enum.TryParse(day, out tempDay);

            try
			{
				var lines = _unitOfWork.Lines.Find(x => x.Name.ToString() == lineName);

				foreach (var line in lines)
				{
					Departure temp = line.Departures.FirstOrDefault(x => x.Day == tempDay);

					if (temp != null)
					{
						line.Departures.Remove(temp);
					}

					_unitOfWork.Lines.Update(line);
				}

				_unitOfWork.Complete();

			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return StatusCode(HttpStatusCode.NoContent);
		}


		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
		[Route("EditLine")]
		[HttpPut]
		public IHttpActionResult EditLine()
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

            Line line = new Line();

            var httpRequest = HttpContext.Current.Request;
            var idString = httpRequest.Form["Id"];
            int Id = Int32.Parse(idString);
            var Name = httpRequest.Form["Name"];
            var regionNumber = httpRequest.Form["Region"];
            Regions Region;
            if(regionNumber == "0")
            {
                Region = Regions.gradski;
            }
            else
            {
                Region = Regions.prigradski;
            }

            line.Id = Id;
            line.Name = Name;
            line.Region = Region;

            try
            {
				_unitOfWork.Lines.Update(line);
				_unitOfWork.Complete();
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return Ok();
		}

		[Authorize(Roles = "Admin")]
		[Route("DeleteLine")]
		[ResponseType(typeof(Line))]
		[HttpDelete]
		public IHttpActionResult DeleteLine(string name)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				var lines = _unitOfWork.Lines.Find(x => x.Name == name);

				if (lines != null)
				{
					foreach (var line in lines)
                    {
                        _unitOfWork.Lines.Remove(line);
					}

					_unitOfWork.Complete();

					return Ok();
				}
			}
			catch (DbUpdateConcurrencyException)
			{
				return NotFound();
			}

			return NotFound();

		}

        

        private bool LinesItemExists(int id)
		{
			return _unitOfWork.Lines.Get(id) != null;
		}

		public static T ParseEnum<T>(string value)
		{
			return (T)Enum.Parse(typeof(T), value, true);
		}
	}
}
