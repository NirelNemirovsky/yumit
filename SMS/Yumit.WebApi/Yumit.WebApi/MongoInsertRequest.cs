using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Yumit.WebApi
{
    public class MongoInsertRequest<T>
    {
        public string CollectionName { get; set; }

        public T Document { get; set; }
    }
}