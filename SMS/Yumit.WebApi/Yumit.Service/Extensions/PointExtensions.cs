using System;
using Yumit.Service.VesselFinder.DataObjects;

namespace Yumit.Service.Extensions
{
    public static class PointExtensions
    {
        private const double MilesToLatitude = 59.70518359;
        private const double MilesToLongitude = 60.1079914;

        public static void AddMiles(this Point point, double miles)
        {
            point.AddMilesToLatitude(miles);
            point.AddMilesToLongitude(miles);
            point.Latitude = point.Latitude + miles / MilesToLatitude;
        }

        private static void AddMilesToLatitude(this Point point, double miles)
        {
            point.Latitude = point.Latitude + miles / MilesToLatitude;
        }

        private static void AddMilesToLongitude(this Point point, double miles)
        {
            point.Longitude = point.Longitude + miles / (MilesToLongitude * Math.Cos(point.Latitude * (Math.PI / 180)));
        }
    }
}
