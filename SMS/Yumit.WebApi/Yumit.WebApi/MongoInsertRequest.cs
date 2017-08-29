using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Yumit.WebApi
{
    public class MongoInsertRequest
    {
        public string CollectionName { get; set; }

        public object Document { get; set; }
    }
}