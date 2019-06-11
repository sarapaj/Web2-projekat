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
		// GET: api/Line
		public IEnumerable<Line> GetAllLines()
		{
			return _unitOfWork.Lines.GetAll();
		}

		//public IEnumerable<Line> EditLines()
		//{
		//	string combindedString = string.Join(",", myList.ToArray());



		//}

		[Route("GetLineNames")] 
		[ResponseType(typeof(List<string>))]
		public IHttpActionResult GetLineNames()  //vraca imena svih linija kao string 
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


			return NotFound();
		}

		[Route("GetDepartures")]
		[ResponseType(typeof(List<string>))]
		public IHttpActionResult GetDepartures(string day, string lineName)  //vraca polaske za konkretnu liniju
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
							List<string> result = item.TimeOfDeparture.Split(new char[] { ',' }).ToList();

							return Ok(result);
						}
					}
				}
			}

			return NotFound();
		}

		// GET: api/Line/5
		[ResponseType(typeof(Line))]
		public IHttpActionResult GetLineById(int id)
		{
			Line line = _unitOfWork.Lines.Get(id);
			if (line == null)
			{
				return NotFound();
			}

			return Ok(line);
		}


		// POST: api/Line
		[ResponseType(typeof(Line))]
		public IHttpActionResult PostItem(Line line)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_unitOfWork.Lines.Add(line);
			_unitOfWork.Complete();

			return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
		}
		// PUT: api/Line/5
		[ResponseType(typeof(void))]
		public IHttpActionResult PutLineItem(int id, Line line)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != line.Id)
			{
				return BadRequest();
			}

			try
			{
				_unitOfWork.Lines.Update(line);
				_unitOfWork.Complete();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!LinesItemExists(id))
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

		// DELETE: api/Line/5
		[ResponseType(typeof(Line))]
		public IHttpActionResult DeleteLine(int id)
		{
			Line line = _unitOfWork.Lines.Get(id);
			if (line == null)
			{
				return NotFound();
			}

			_unitOfWork.Lines.Remove(line);
			_unitOfWork.Complete();

			return Ok(line);
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
