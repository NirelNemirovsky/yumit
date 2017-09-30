using System;
using System.Linq;
using Yumit.Service.Equasis;
using Yumit.Service.Extensions;
using Yumit.Service.VesselFinder;
using Yumit.Service.VesselFinder.DataObjects;

namespace Yumit.Service
{
    class Program
    {
        static void Main()
        {
            var finder = new VesselFinderClient();
            var equasis = new EquasisClient();
            var gaza = new Point(31.323499, 34.218753);
            var roshHanikra = new Point(33.094099, 35.103982);
            gaza.AddMiles(10, -1);
            roshHanikra.AddMiles(10);
            var shipInfos = finder.GetAllShipsInArea(gaza, roshHanikra).Result;
            var shipProperties = shipInfos.Select(info => info.Imo).Where(imo => !string.IsNullOrEmpty(imo))
                .Select(imo => equasis.GetAllShipInfo(imo).Result).ToList();
            Console.Read();
        }

        
    }
}
