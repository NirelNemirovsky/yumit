using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Yumit.WebApi
{
    public class CourseDocument
    {
        public string IMO { get; set; }
        public string Dest { get; set; }
        public string Timestamp { get; set; }
        public string EtaStamp { get; set; }
        public string ShipCourse { get; set; }
        public string ShipSpeed { get; set; }

    }
}