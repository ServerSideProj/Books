using System.Data.SqlClient;

namespace Backend.DAL
{
    public class DBservices
    {

        public DBservices()
        {
        }

        public SqlConnection connect(String conString)
        {

            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }


    }

}
