using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Yumit.Service.VesselFinder.DataObjects;

namespace Yumit.Service.VesselFinder
{
    public class VesselFinderClient
    {
        private readonly HttpClient _client;

        public VesselFinderClient()
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36");
        }

        public async Task<IEnumerable<VesselInfo>> GetAllShipsInArea(Point bottomLeft, Point topRight)
        {
            _client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
            var siteAddress = string.Format("https://www.vesselfinder.com/vesselsonmap?bbox={0}&zoom=7&pv=6",
                CreateGeographicalSquareString(bottomLeft, topRight));
            var ships = await _client.GetStringAsync(siteAddress);
            var rows = ships.Split('\n');
            var mmsiArr = rows.Where(row => !string.IsNullOrEmpty(row) && row.Contains('\t'))
                .Select(row => row.Split('\t')[5]);
            var shipInfos = mmsiArr.Select(mmsi => GetShipInfoByMmsi(mmsi).Result).ToList();
            return shipInfos;
        }

        private async Task<VesselInfo> GetShipInfoByMmsi(string mmsi)
        {
            var random = new Random();
            Thread.Sleep(random.Next(5) * 1000);
            var address = string.Format("https://www.vesselfinder.com/clickinfo?mmsi={0}", mmsi);
            var shipInfoStr = await _client.GetStringAsync(address);
            var shipInfo = JsonConvert.DeserializeObject<VesselInfo>(shipInfoStr);
            return shipInfo;
        }

        private string CreateGeographicalSquareString(Point bottomLeft, Point topRight)
        {
            var geoString = string.Format("{0},{1},{2},{3}", bottomLeft.Longitude, bottomLeft.Latitude,
                topRight.Longitude, topRight.Latitude);
            var encodedGeoString = HttpUtility.UrlEncode(geoString);
            return encodedGeoString;
        }
    }
}
