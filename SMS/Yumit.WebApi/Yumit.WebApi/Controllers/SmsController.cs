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
        private static readonly Dictionary<string, string> numberToArn = new Dictionary<string, string>();

        static SmsController()
        {
            Client = new AmazonSimpleNotificationServiceClient(new BasicAWSCredentials("AKIAJOMZAEESGAYK6EKA", "L6qF0b2Rtgzk3lhLJrh976hqAlz+MWyy8g1ACQ2e"), RegionEndpoint.EUWest1);
            var request = new ListSubscriptionsByTopicRequest(TopicArn);
            var response = Client.ListSubscriptionsByTopic(request);
            response.Subscriptions.ToDictionary(x => x.Endpoint, x => x.SubscriptionArn);
        }

        [HttpPost]
        public IHttpActionResult RegisterPhoneNumber(string phoneNumber)
        {
            var subscribeRequest = new SubscribeRequest(TopicArn, "sms", phoneNumber);
            var response = Client.Subscribe(subscribeRequest);
            numberToArn.Add(phoneNumber, response.SubscriptionArn);
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult UnRegisterPhoneNumber(string phoneNumber)
        {
            var subscriptionArn = numberToArn[phoneNumber];
            var unsubscribeRequest = new UnsubscribeRequest(subscriptionArn);
            Client.Unsubscribe(unsubscribeRequest);
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
