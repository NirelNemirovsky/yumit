using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Yumit.WebApi
{
    public class ShipDocument
    {

        public string IMO { get; set; }

        public string Name { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public string Sizes { get; set; }
        public string Gt { get; set; }
        public string Country { get; set; }

    }
}