using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Yumit.Service
{
    public class VesselFinder
    {
        private const double MilesToLatitude = 59.70518359;
        private const double MilesToLongitude = 60.1079914;
        private readonly HttpClient _client;

        private static readonly double[] RoshHanikra = {33.094099, 35.103982};
        private static readonly double[] Gaza = {31.323499, 34.218753};

        public VesselFinder()
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.UserAgent.Add(
                new ProductInfoHeaderValue(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36"));
        }

        public async void GetAllShips(double distance)
        {
            //'https://www.vesselfinder.com/vesselsonmap?bbox='+ calculate_square_str(distance) +'&zoom=7&pv=6'
            //                'X-Requested-With': 'XMLHttpRequest',
            _client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
            var siteAddress = string.Format("https://www.vesselfinder.com/vesselsonmap?bbox={0}&zoom=7&pv=6", CreateGeographicalSquareString(distance));
            var result = await _client.GetAsync(siteAddress);
        }

        public string CreateGeographicalSquareString(double distance)
        {
            var left = AddMilesToLatitude(-distance, Gaza[0]);
            var bottom = AddMilesToLongitude(-distance, left, Gaza[1]);
            var right = AddMilesToLatitude(-distance, RoshHanikra[0]);
            var top = AddMilesToLongitude(-distance, right, RoshHanikra[1]);
            var geoString = string.Format("{0},{1},{2},{3}", bottom, left, top, right);
            var encodedGeoString = HttpUtility.UrlEncode(geoString);
            return encodedGeoString;
        }

        public double AddMilesToLatitude(double miles, double latitude)
        {
            return latitude + miles / MilesToLatitude;
        }

        public double AddMilesToLongitude(double miles, double latitude, double longitude)
        {
            return longitude + miles / (MilesToLongitude * Math.Cos(latitude * (Math.PI / 180)));
        }

    }
}
