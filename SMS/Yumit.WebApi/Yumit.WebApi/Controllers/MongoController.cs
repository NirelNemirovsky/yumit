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
        public IHttpActionResult InsertShip([FromBody] MongoInsertRequest<ShipDocument> request)
        {
            var collection = Db.GetCollection<ShipDocument>(request.CollectionName);
            collection.BulkWrite(
            new List<WriteModel<ShipDocument>> { new InsertOneModel<ShipDocument>(request.Document) });
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult InsertCourse([FromBody] MongoInsertRequest<CourseDocument> request)
        {
            var collection = Db.GetCollection<CourseDocument>(request.CollectionName);
            collection.BulkWrite(
                new List<WriteModel<CourseDocument>> { new InsertOneModel<CourseDocument>(request.Document) });
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult GetDocuments(string collectionName, string key)
        {
            var collection = Db.GetCollection<object>(collectionName);
            var builder = new FilterDefinitionBuilder<object>();
            var result = collection.FindSync(builder.Eq("IMO", key));
            var documents = result.ToList();
            return Ok(documents);
        }

        [HttpGet]
        public IHttpActionResult GetDocuments(string collectionName)
        {
            var collection = Db.GetCollection<object>(collectionName);
            return Ok(collection);
        }
    }

}
