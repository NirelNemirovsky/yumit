using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace Yumit.Service.Equasis
{
    public class EquasisClient
    {
        private readonly HttpClient _client;

        private readonly IEnumerable<string> _keys = new[] { "flag" };

        private readonly Dictionary<string, string> _keyToXpath = new Dictionary<string, string>
        {
            {"flag", "//table/tbody/tr[1]/td[5]"}
        };

        private readonly Dictionary<string, Func<string, string>> _keyToContentExtractor = new Dictionary<string, Func<string, string>>
        {
            {"flag", GetFlagFromContent}
        };

        private static readonly Dictionary<string, string> LoginFormDictionary = new Dictionary<string, string>
        {
            {"j_email","eran.gil2@gmail.com" },
            {"j_password", "1234567" },
            {"submit", "Login" }
        };

        public EquasisClient()
        {
            _client = new HttpClient();
            Login();
        }

        public async Task<Dictionary<string, string>> GetAllShipInfo(string imo)
        {
            var pageHtml = await GetPageHtml(imo);
            var shipProperties = GetShipPropertiesFromHtml(pageHtml);
            return shipProperties;
        }

        private void Login()
        {
            var formContent = new FormUrlEncodedContent(LoginFormDictionary);
            _client.PostAsync("http://www.equasis.org/EquasisWeb/authen/HomePage?fs=HomePage", formContent).Wait();
        }

        private Dictionary<string, string> GetShipPropertiesFromHtml(string pageHtml)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(pageHtml);
            var shipDictionary = new Dictionary<string, string>();
            foreach (var key in _keys)
            {
                var element = doc.GetElementbyId("resultShip").SelectSingleNode(_keyToXpath[key]);
                var extracteContent = _keyToContentExtractor[key].Invoke(element.InnerText);
                shipDictionary[key] = extracteContent;
            }
            return shipDictionary;
        }

        private async Task<string> GetPageHtml(string imo)
        {
            var formContent = CreateFormContentForImo(imo);
            var address = "http://www.equasis.org/EquasisWeb/restricted/Search?fs=search";
            var result = await _client.PostAsync(address, formContent);
            var pageHtml = await result.Content.ReadAsStringAsync();
            return pageHtml;
        }

        private static FormUrlEncodedContent CreateFormContentForImo(string imo)
        {
            var formValues = new Dictionary<string, string>
            {
                {"P_PAGE", "1"},
                {"P_PAGE_COMP", "1"},
                {"P_PAGE_SHIP", "1"},
                {"P_ENTREE_HOME", imo},
                {"P_ENTREE_HOME_HIDDEN", imo},
                {"advancedSearch", string.Empty},
            };
            var formContent = new FormUrlEncodedContent(formValues);
            return formContent;
        }

        private static string GetFlagFromContent(string content)
        {
            var shipFlag = content.Split(new[] { "\r", "\n", "\t" }, StringSplitOptions.RemoveEmptyEntries)[1];
            shipFlag = shipFlag.Substring(1, shipFlag.Length - 2);
            return shipFlag;
        }
    }
}
