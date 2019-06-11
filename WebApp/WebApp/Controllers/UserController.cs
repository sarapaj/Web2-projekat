using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{

	[RoutePrefix("api/User")]

	public class UserController : ApiController
    {
		IUnitOfWork _unitOfWork;
		private DbContext _context;

		// GET: api/User
		public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

		


        // POST: api/User
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }

	
	}
}
