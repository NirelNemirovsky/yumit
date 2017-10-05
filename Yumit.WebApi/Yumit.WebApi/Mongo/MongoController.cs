using System.Collections.Generic;
using System.Web.Http;
using MongoDB.Driver;
using Yumit.WebApi.Mongo.Documents;
using Yumit.WebApi.Mongo.Requests;

namespace Yumit.WebApi.Mongo
{
    public class MongoController : ApiController
    {
        private static readonly IMongoDatabase Db;
        private const string ConnectionString = "mongodb://Yumit:yumit@ds161793.mlab.com:61793/yumit";

        static MongoController()
        {
            var client = new MongoClient(ConnectionString);
            Db = client.GetDatabase("yumit");
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
        public IHttpActionResult GetDocumentsByKey(string collectionName, string key)
        {
            var collection = Db.GetCollection<object>(collectionName);
            var builder = new FilterDefinitionBuilder<object>();
            var result = collection.FindSync(builder.Eq("IMO", key));
            var documents = result.ToList();
            return Ok(documents);
        }

        [HttpGet]
        public IHttpActionResult GetAllDocuments(string collectionName)
        {
            var collection = Db.GetCollection<object>(collectionName);
            return Ok(collection);
        }
    }

}
