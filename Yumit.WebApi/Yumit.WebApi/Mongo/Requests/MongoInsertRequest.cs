namespace Yumit.WebApi.Mongo.Requests
{
    public class MongoInsertRequest<T>
    {
        public string CollectionName { get; set; }

        public T Document { get; set; }
    }
}