namespace Yumit.Service.VesselFinder.DataObjects
{
    public class Point
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public Point(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }
    }
}
