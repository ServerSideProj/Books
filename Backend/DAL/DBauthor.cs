using System;
using System.Data;
using System.Data.SqlClient;

using Backend.BL;


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

        public List<Author> GetAllAuthors()
        {
            List<Author> authors = new List<Author>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetAllAuthors", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            authors.Add(new Author(
                                id: Convert.ToInt32(reader["id"]),
                                name: reader["name"].ToString(),
                                biography: reader["biography"].ToString(),
                                wikiLink: reader["wikiLink"].ToString()
                            ));
                        }
                    }
                }
            }

            return authors;
        }
    }
}
