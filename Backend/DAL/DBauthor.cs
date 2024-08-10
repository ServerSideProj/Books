﻿using System;
using System.Collections.Generic;
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
                cmd.Parameters.AddWithValue("@PictureUrl", author.PictureUrl); 

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
                                id: Convert.ToInt32(reader["Id"]),
                                name: reader["Name"].ToString(),
                                biography: reader["Biography"].ToString(),
                                wikiLink: reader["WikiLink"].ToString(),
                                pictureUrl: reader["PictureUrl"].ToString() 
                            ));
                        }
                    }
                }
            }

            return authors;
        }

        public void UpdateAuthor(Author author)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateAuthor", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", author.Id);
                cmd.Parameters.AddWithValue("@Name", author.Name);
                cmd.Parameters.AddWithValue("@Biography", author.Biography);
                cmd.Parameters.AddWithValue("@WikiLink", author.WikiLink);
                cmd.Parameters.AddWithValue("@PictureUrl", author.PictureUrl);

                cmd.ExecuteNonQuery();
            }
        }

        public IEnumerable<object> GetAuthorWithBookCount()
        {
            var authors = new List<object>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAuthorWithBookCount", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        authors.Add(new
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Biography = reader.IsDBNull(reader.GetOrdinal("Biography")) ? "" : reader["Biography"].ToString(),
                            WikiLink = reader.IsDBNull(reader.GetOrdinal("WikiLink")) ? "" : reader["WikiLink"].ToString(),
                            PictureUrl = reader.IsDBNull(reader.GetOrdinal("PictureUrl")) ? "" : reader["PictureUrl"].ToString(),
                            BookCount = Convert.ToInt32(reader["BookCount"])
                        });
                    }
                }

                return authors;
            }
        }

    }
}
