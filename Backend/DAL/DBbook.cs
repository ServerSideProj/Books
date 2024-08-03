using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Backend.BI;
using Backend.BL;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Backend.DAL
{
    public class DBbook : DBservices
    {
        // Get Top 5 Popular Physical Books
        public List<Book> GetTop5PopularPhysBooks()
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetTop5PopularPhysBooks", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(MapBook(reader));
                        }
                    }
                }
            }

            return books;
        }

        // Get Top 5 Popular Digital Books
        public List<Book> GetTop5PopularEbooks()
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetTop5PopularEbooks", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(MapBook(reader));
                        }
                    }
                }
            }

            return books;
        }

        // Get Books by Specific Categories
        public List<Book> GetBooksByCategories(string categories)
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBooksByCategories", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Categories", categories);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(MapBook(reader));
                        }
                    }
                }
            }

            return books;
        }

        // Get All Reviews for a Specific Book
        public List<Review> GetReviewsByBook(string title)
        {
            List<Review> reviews = new List<Review>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetReviewsByBook", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Title", title);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            reviews.Add(new Review(
                                reviewNum: Convert.ToInt32(reader["reviewNum"]),
                                title: reader["title"].ToString(),
                                reviewText: reader["review"].ToString(),
                                email: reader["email"].ToString(),
                                rating: Convert.ToInt32(reader["rating"]),
                                finishedReading: Convert.ToBoolean(reader["finishedReading"])
                            ));
                        }
                    }
                }
            }

            return reviews;
        }

        // Get Books by Specific Author(s)
        public List<Book> GetBooksByAuthor(string authorName)
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBooksByAuthor", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AuthorName", authorName);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(MapBook(reader));
                        }
                    }
                }
            }

            return books;
        }

        // Get Books Purchased by Friends
        public List<Book> GetBooksPurchasedByFriends(string userEmail)
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBooksPurchasedByFriends", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(MapBook(reader));
                        }
                    }
                }
            }

            return books;
        }

        // Get Books by Rating Range
        public List<Book> GetBooksByRatingRange(int minRating, int maxRating)
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBooksByRating", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@MinRating", minRating);
                    cmd.Parameters.AddWithValue("@MaxRating", maxRating);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(MapBook(reader));
                        }
                    }
                }
            }

            return books;
        }

        // Add Review for a Book (and Update Book Rating)
        public void AddReview(string title, string email, string reviewText, int rating, bool finishedReading)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_AddReview", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Title", title);
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@Review", reviewText);
                    cmd.Parameters.AddWithValue("@Rating", rating);
                    cmd.Parameters.AddWithValue("@FinishedReading", finishedReading);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Get Books Purchased by a User
        public List<Book> GetBooksPurchasedByUser(string userEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetBooksPurchasedByUser", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                List<Book> books = new List<Book>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        books.Add(MapBook(reader));
                    }
                }

                return books;
            }
        }

        // Get Books Purchased by a User with Sale Status
        public List<Book> GetBooksPurchasedByUserWithSaleStatus(string userEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetBooksPurchasedByUserWithSaleStatus", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                List<Book> books = new List<Book>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        books.Add(new Book(
                            title: reader["title"].ToString(),
                            description: reader["description"].ToString(),
                            language: reader["language"].ToString(),
                            avgRating: Convert.ToSingle(reader["avgRating"]),
                            ratingCount: Convert.ToInt32(reader["ratingCount"]),
                            maturityRating: reader["maturityRating"].ToString(),
                            infoLink: reader["infoLink"].ToString(),
                            publisher: reader["publisher"].ToString(),
                            isEbook: Convert.ToBoolean(reader["isEbook"]),
                            publishDate: ((DateTime)reader["publishDate"]),
                            pageCount: Convert.ToInt32(reader["pageCount"]),
                            subtitle: reader["subtitle"].ToString(),
                            categories: GetCategoriesByBookTitle(reader["title"].ToString()),
                            authors: GetAuthorsByBookTitle(reader["title"].ToString())
                        ));
                    }
                }

                return books;
            }
        }

        // Get authors for a specific book title
        private Author[] GetAuthorsByBookTitle(string title)
        {
            List<Author> authors = new List<Author>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAuthorsByBookTitle", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Title", title);

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

            return authors.ToArray();
        }

        // Get categories for a specific book title
        private string[] GetCategoriesByBookTitle(string title)
        {
            List<string> categories = new List<string>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetCategoriesByBookTitle", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Title", title);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        categories.Add(reader["category"].ToString());
                    }
                }
            }

            return categories.ToArray();
        }

        // Add Books
        public void AddBooks(List<Book> books)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlTransaction transaction = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var book in books)
                        {
                            using (SqlCommand cmd = new SqlCommand("sp_AddBook", con, transaction))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;

                                cmd.Parameters.AddWithValue("@Title", book.Title);
                                cmd.Parameters.AddWithValue("@Description", book.Description);
                                cmd.Parameters.AddWithValue("@Language", book.Language);
                                cmd.Parameters.AddWithValue("@AvgRating", book.AvgRating);
                                cmd.Parameters.AddWithValue("@RatingCount", book.RatingCount);
                                cmd.Parameters.AddWithValue("@MaturityRating", book.MaturityRating);
                                cmd.Parameters.AddWithValue("@InfoLink", book.InfoLink);
                                cmd.Parameters.AddWithValue("@Publisher", book.Publisher);
                                cmd.Parameters.AddWithValue("@IsEbook", book.IsEbook);
                                cmd.Parameters.AddWithValue("@PublishDate", book.PublishDate);
                                cmd.Parameters.AddWithValue("@PageCount", book.PageCount);
                                cmd.Parameters.AddWithValue("@Subtitle", book.Subtitle);

                                cmd.ExecuteNonQuery();
                            }

                            // Add authors and map them to the book
                            foreach (var author in book.Authors)
                            {
                                int authorId = EnsureAuthorExists(con, transaction, author);

                                using (SqlCommand authorBookCmd = new SqlCommand("sp_AddBookAuthor", con, transaction))
                                {
                                    authorBookCmd.CommandType = CommandType.StoredProcedure;

                                    authorBookCmd.Parameters.AddWithValue("@Title", book.Title);
                                    authorBookCmd.Parameters.AddWithValue("@AuthorID", authorId);

                                    authorBookCmd.ExecuteNonQuery();
                                }
                            }

                            // Add categories and map them to the book
                            foreach (var category in book.Categories)
                            {
                                EnsureCategoryExists(con, transaction, category);

                                using (SqlCommand categoryBookCmd = new SqlCommand("sp_AddBookCategory", con, transaction))
                                {
                                    categoryBookCmd.CommandType = CommandType.StoredProcedure;

                                    categoryBookCmd.Parameters.AddWithValue("@Title", book.Title);
                                    categoryBookCmd.Parameters.AddWithValue("@Category", category);

                                    categoryBookCmd.ExecuteNonQuery();
                                }
                            }
                        }

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception("An error occurred while adding books", ex);
                    }
                }
            }
        }

        private int EnsureAuthorExists(SqlConnection con, SqlTransaction transaction, Author author)
        {
            SqlCommand checkCmd = new SqlCommand("sp_CheckAuthorExists", con, transaction);
            checkCmd.CommandType = CommandType.StoredProcedure;

            checkCmd.Parameters.AddWithValue("@Name", author.Name);

            object result = checkCmd.ExecuteScalar();

            if (result != null)
            {
                return Convert.ToInt32(result); // Author already exists and returns the ID
            }
            else
            {
                SqlCommand insertCmd = new SqlCommand("sp_AddAuthor", con, transaction);
                insertCmd.CommandType = CommandType.StoredProcedure;

                insertCmd.Parameters.AddWithValue("@Name", author.Name);
                insertCmd.Parameters.AddWithValue("@Biography", author.Biography);
                insertCmd.Parameters.AddWithValue("@WikiLink", author.WikiLink);

                return Convert.ToInt32(insertCmd.ExecuteScalar()); // Return the new Author ID
            }
        }

        private void EnsureCategoryExists(SqlConnection con, SqlTransaction transaction, string category)
        {
            SqlCommand checkCmd = new SqlCommand("sp_CheckCategoryExists", con, transaction);
            checkCmd.CommandType = CommandType.StoredProcedure;

            checkCmd.Parameters.AddWithValue("@Category", category);

            object result = checkCmd.ExecuteScalar();

            if (result == null)
            {
                SqlCommand insertCmd = new SqlCommand("sp_AddCategory", con, transaction);
                insertCmd.CommandType = CommandType.StoredProcedure;

                insertCmd.Parameters.AddWithValue("@Category", category);
                insertCmd.ExecuteNonQuery();
            }
        }

        public int AddEbookCopy(BookCopy ebookCopy)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AddEbookCopy", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Title", ebookCopy.Title);
                cmd.Parameters.AddWithValue("@OwnerEmail", (object)ebookCopy.OwnerEmail ?? DBNull.Value);

                // return new copy id
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public int AddPhysBookCopy(PhysBookCopy physBookCopy)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AddPhysBookCopy", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Title", physBookCopy.Title);
                cmd.Parameters.AddWithValue("@OwnerEmail", (object)physBookCopy.OwnerEmail ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@IsForSale", physBookCopy.IsForSale);
                cmd.Parameters.AddWithValue("@Price", physBookCopy.Price);

                // return new copy id
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public List<Book> GetAllBooks()
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllBooks", con);
                cmd.CommandType = CommandType.StoredProcedure;

                List<Book> books = new List<Book>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        books.Add(MapBook(reader));
                    }
                }

                return books;
            }
        }

        // maps SQL data to Book object
        private Book MapBook(SqlDataReader reader)
        {
            return new Book(
                title: reader["title"].ToString(),
                description: reader["description"].ToString(),
                language: reader["language"].ToString(),
                avgRating: Convert.ToSingle(reader["avgRating"]),
                ratingCount: Convert.ToInt32(reader["ratingCount"]),
                maturityRating: reader["maturityRating"].ToString(),
                infoLink: reader["infoLink"].ToString(),
                publisher: reader["publisher"].ToString(),
                isEbook: Convert.ToBoolean(reader["isEbook"]),
                publishDate: ((DateTime)reader["publishDate"]),
                pageCount: Convert.ToInt32(reader["pageCount"]),
                subtitle: reader["subtitle"].ToString(),
                categories: GetCategoriesByBookTitle(reader["title"].ToString()),
                authors: GetAuthorsByBookTitle(reader["title"].ToString())
            );
        }

        // maps SQL data to appropriate BookCopy object
        private BookCopy MapBookCopy(SqlDataReader reader)
        {
            string title = reader["title"].ToString();
            bool isEbook = Convert.ToBoolean(reader["isEbook"]);

            int copyId = Convert.ToInt32(reader["copyId"]);
            string description = reader["description"].ToString();
            string language = reader["language"].ToString();
            float avgRating = Convert.ToSingle(reader["avgRating"]);
            int ratingCount = Convert.ToInt32(reader["ratingCount"]);
            string maturityRating = reader["maturityRating"].ToString();
            string infoLink = reader["infoLink"].ToString();
            string publisher = reader["publisher"].ToString();
            DateTime publishDate = (DateTime)reader["publishDate"];
            int pageCount = Convert.ToInt32(reader["pageCount"]);
            string subtitle = reader["subtitle"].ToString();
            string ownerEmail = reader["ownerEmail"].ToString();
            var categories = GetCategoriesByBookTitle(title);
            var authors = GetAuthorsByBookTitle(title);

            if (isEbook)
            {
                // EBookCopy
                return new BookCopy(
                    copyId: copyId,
                    title: title,
                    description: description,
                    language: language,
                    avgRating: avgRating,
                    ratingCount: ratingCount,
                    maturityRating: maturityRating,
                    infoLink: infoLink,
                    publisher: publisher,
                    isEbook: isEbook,
                    publishDate: publishDate,
                    pageCount: pageCount,
                    subtitle: subtitle,
                    categories: categories.ToArray(),
                    authors: authors.ToArray(),
                    ownerEmail: ownerEmail
                );
            }
            else
            {
                //PhysBookCopy
                bool isForSale = Convert.ToBoolean(reader["isForSale"]);
                decimal price = Convert.ToDecimal(reader["price"]);

                return new PhysBookCopy(
                    copyId: copyId,
                    title: title,
                    description: description,
                    language: language,
                    avgRating: avgRating,
                    ratingCount: ratingCount,
                    maturityRating: maturityRating,
                    infoLink: infoLink,
                    publisher: publisher,
                    isEbook: isEbook,
                    publishDate: publishDate,
                    pageCount: pageCount,
                    subtitle: subtitle,
                    categories: categories.ToArray(),
                    authors: authors.ToArray(),
                    ownerEmail: ownerEmail,
                    isForSale: isForSale,
                    price: price
                );
            }
        }

        // Get All Ebook Copies
        public List<BookCopy> GetAllEbookCopies()
        {
            List<BookCopy> ebookCopies = new List<BookCopy>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetAllEbookCopies", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ebookCopies.Add(MapBookCopy(reader));
                        }
                    }
                }
            }

            return ebookCopies;
        }
        // Get All Physical Book Copies
        public List<BookCopy> GetAllPhysBookCopies()
        {
            List<BookCopy> physBookCopies = new List<BookCopy>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetAllPhysBookCopies", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            physBookCopies.Add(MapBookCopy(reader));
                        }
                    }
                }
            }

            return physBookCopies;
        }

    }

}
