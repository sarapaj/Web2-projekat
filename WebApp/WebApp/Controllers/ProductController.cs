using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class ProductController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;

        public ProductController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        // GET: api/Product
        public IEnumerable<Product> Get()
        {
            return _unitOfWork.Products.GetAll();
            //return new string[] { "value1", "value2" };
        }

        // GET: api/Product/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Product
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT: api/Product/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Product/5
        public void Delete(int id)
        {
        }

        [Authorize(Roles = "Admin")]
        [Route("api/Product/PostProduct")]
        public IHttpActionResult PostProduct()
        {
            var req = HttpContext.Current.Request;
            var product = new Product() { Name = "proizvod", Id = 1 };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _unitOfWork.Products.Add(product);
            _unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
        }
    }
}
