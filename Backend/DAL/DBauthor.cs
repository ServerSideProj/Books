using System;
using System.Data;
using System.Data.SqlClient;

using Backend.BI;


namespace Backend.DAL
{
    public class DBauthor : DBservices
    {
        public void AddAuthor(Author author)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AddAuthor", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Name", author.Name);
                cmd.Parameters.AddWithValue("@Biography", author.Biography);
                cmd.Parameters.AddWithValue("@WikiLink", author.WikiLink);

                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteAuthor(int authorId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_DeleteAuthor", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@AuthorId", authorId);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
