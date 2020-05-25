using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;

namespace SellMyRock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuoteController : ControllerBase
    {
        [HttpPost]
        public string Post(IFormCollection form)
        {
            var quote = new Quote
            {
                Name = form["name"][0],
                Address = form["address"][0],
                Phone = form["phone"][0],
                Shape = form["shape"][0],
                Carat = form["carat"][0],
                Color = form["color"][0],
                Clarity = form["clarity"][0],
                ReportNumber = form["reportNumber"][0],
                Certified = form["certified"][0],
                Files = convertFilesToStrings(form.Files)
            };

            return saveQuote(quote);
        }

        [HttpGet]
        public List<Quote> Get(IFormCollection form)
        {
            var results = new List<Quote>();
            using (SqlConnection conn = new SqlConnection("Server=.;DataBase=Sellmyrock;Integrated Security=SSPI"))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("Select * from [dbo].[Quote] Order by CreatedDate Desc", conn);
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read()) {
                        var quote = new Quote {
                            Id = rdr["Id"].ToString(),
                            Name = rdr["Name"].ToString(),
                            Address = rdr["Address"].ToString(),
                            Phone = rdr["Phone"].ToString(),
                            Shape = rdr["Shape"].ToString(),
                            Carat = rdr["Carat"].ToString(),
                            Color = rdr["Color"].ToString(),
                            Clarity = rdr["Clarity"].ToString(),
                            ReportNumber = rdr["ReportNumber"].ToString(),
                            Certified = rdr["Certified"].ToString(),
                            Files = rdr["Files"].ToString().Split(",").ToList(),
                        };
                        results.Add(quote);
                    }
                }
            }
            return results;
        }

        private string saveQuote(Quote quote)
        {
            using (SqlConnection conn = new SqlConnection("Server=.;DataBase=Sellmyrock;Integrated Security=SSPI"))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("procSaveQuote", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Name", quote.Name));
                cmd.Parameters.Add(new SqlParameter("@Address", quote.Address));
                cmd.Parameters.Add(new SqlParameter("@Phone", quote.Phone));
                cmd.Parameters.Add(new SqlParameter("@Shape", quote.Shape));
                cmd.Parameters.Add(new SqlParameter("@Carat", quote.Carat));
                cmd.Parameters.Add(new SqlParameter("@Color", quote.Color));
                cmd.Parameters.Add(new SqlParameter("@Clarity", quote.Clarity));
                cmd.Parameters.Add(new SqlParameter("@ReportNumber", quote.ReportNumber));
                cmd.Parameters.Add(new SqlParameter("@Certified", quote.Certified));
                cmd.Parameters.Add(new SqlParameter("@Files", String.Join(",",quote.Files)));

                var returnParameter = cmd.Parameters.Add("@id", SqlDbType.Int);
                returnParameter.Direction = ParameterDirection.ReturnValue;
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    rdr.Read();
                    return cmd.Parameters["@id"].Value.ToString();
                }
            }
        }

        private List<string> convertFilesToStrings(IFormFileCollection files)
        {
            var result = new List<string>();
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        result.Add(Convert.ToBase64String(fileBytes));
                    }
                }
            }
            return result;
        }

        public class Quote
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            public string Shape { get; set; }
            public string Carat { get; set; }
            public string Color { get; set; }
            public string Clarity { get; set; }
            public string ReportNumber { get; set; }
            public string Certified { get; set; }
            public List<string> Files { get; set; }
        }
    }
}
