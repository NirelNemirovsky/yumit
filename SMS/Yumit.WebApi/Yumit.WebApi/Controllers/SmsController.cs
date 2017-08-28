using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Amazon;
using Amazon.Runtime;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;

namespace Yumit.WebApi.Controllers
{
    public class SmsController : ApiController
    {
        private static readonly AmazonSimpleNotificationServiceClient Client;
        private const string TopicArn = "arn:aws:sns:eu-west-1:796754430884:Yumit";

        static SmsController()
        {
            Client = new AmazonSimpleNotificationServiceClient(new BasicAWSCredentials("AKIAJOMZAEESGAYK6EKA", "L6qF0b2Rtgzk3lhLJrh976hqAlz+MWyy8g1ACQ2e"), RegionEndpoint.EUWest1);
        }

        [HttpPost]
        public IHttpActionResult RegisterPhoneNumber(string phoneNumber)
        {
            var subscribeRequest = new SubscribeRequest(TopicArn, "sms", phoneNumber);
            Client.Subscribe(subscribeRequest);
            return Ok();
        }

        [HttpPost]
        public void SendSms(string message)
        {
            var publishRequest = new PublishRequest(TopicArn, message);
            Client.Publish(publishRequest);
        }
    }
}
