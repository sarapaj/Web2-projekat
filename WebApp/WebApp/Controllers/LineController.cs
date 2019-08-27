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


		[Route("GetDepartures")]
		[ResponseType(typeof(IEnumerable<string>))]
		[HttpGet]
		//[EnableCors("*", "*", "*")]
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


		[Route("EditDepartures")]
		[ResponseType(typeof(void))]
		[HttpPut]
		public IHttpActionResult EditDepartures(string day, string lineName, string newDepartures)  //izmena polazaka za admina
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

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

		// GET: api/Line/5
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

			return StatusCode(HttpStatusCode.NoContent);
		}


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
				var line = _unitOfWork.Lines.Find(x => x.Name == name);

				if (line != null)
				{
					foreach (var item in line)
					{
                        _unitOfWork.Lines.Remove(item);
					}


					_unitOfWork.Complete();

					return Ok(line);
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
