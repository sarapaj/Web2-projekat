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
    public class LineController : ApiController
    {

		IUnitOfWork _unitOfWork;
		private DbContext _context;

		public LineController(IUnitOfWork unitOfWork, DbContext context)
		{
			_unitOfWork = unitOfWork;
			_context = context;
		}

		// GET: api/Line
		public IEnumerable<Line> GetAllLines()
		{
			return _unitOfWork.Lines.GetAll();
		}

		// GET: api/Line/5
		[ResponseType(typeof(Line))]
		public IHttpActionResult GetLine(int id)
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
	}
}
