using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ProductRepository : Repository<Product, int>, IProductRepository
    {
        public ProductRepository(DbContext dbContext) : base(dbContext) { }

        //public void Add(Product entity)
        //{
        //    throw new NotImplementedException();
        //}

        //public void AddRange(IEnumerable<Product> entities)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<Product> Find(Expression<Func<Product, bool>> predicate)
        //{
        //    throw new NotImplementedException();
        //}

        //public Product Get(int id)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<Product> GetAll()
        //{
        //    return context.Database.
        //}

        //public void Remove(Product entity)
        //{
        //    throw new NotImplementedException();
        //}

        //public void RemoveRange(IEnumerable<Product> entities)
        //{
        //    throw new NotImplementedException();
        //}

        //public void Update(Product entity)
        //{
        //    throw new NotImplementedException();
        //}
    }
}