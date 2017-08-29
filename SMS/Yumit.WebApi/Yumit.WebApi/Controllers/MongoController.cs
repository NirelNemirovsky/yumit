using System;
using System.Collections.Generic;
using System.Web.Http;
using MongoDB.Driver;

namespace Yumit.WebApi.Controllers
{
    public class MongoController : ApiController
    {
        private static readonly MongoClient Client;
        private static readonly IMongoDatabase Db;
        private const string ConnectionString = "mongodb://Yumit:yumit@ds161793.mlab.com:61793/yumit";

        static MongoController()
        {
            Client = new MongoClient(ConnectionString);
            Db = Client.GetDatabase("yumit");
        }

        [HttpPost]
        public IHttpActionResult InsertDocument([FromBody] MongoInsertRequest request)
        {
            var collection = Db.GetCollection<object>(request.CollectionName);

            collection.BulkWrite(
            new List<WriteModel<object>> { new InsertOneModel<object>(request.Document) });
            Console.WriteLine();
            return Ok();
        }
    }

}
