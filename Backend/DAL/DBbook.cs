﻿using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Backend.BL;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Net;

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
        public List<Review> GetReviewsByBook(int bookId)
        {
            List<Review> reviews = new List<Review>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetReviewsByBook", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BookId", bookId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            reviews.Add(new Review(
                                reviewNum: Convert.ToInt32(reader["reviewNum"]),
                                bookId: Convert.ToInt32(reader["bookId"]),
                                reviewText: reader["review"].ToString(),
                                email: reader["email"].ToString(),
                                rating: Convert.ToInt32(reader["rating"]),
                                username: reader["username"].ToString(),    
                                profileImage: reader["profileImage"].ToString()
                            ));
                        }
                    }
                }
            }
            return reviews;
        }

        // Get Books by Specific Author(s)
        public List<Book> GetBooksByAuthor(int authorId)
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBooksByAuthor", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AuthorID", authorId);  

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
        public void AddReview(int bookId, string email, string reviewText, int rating)
        {
            try
            {
                using (SqlConnection con = connect("myProjDB"))
                {
                    // Check if the user has already submitted a review for this book
                    if (ReviewExists(bookId, email))
                    {
                        throw new Exception("User has already submitted a review for this book.");
                    }

                    // If no review exists, proceed to add the review
                    using (SqlCommand cmd = new SqlCommand("sp_AddReview", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@BookId", bookId);
                        cmd.Parameters.AddWithValue("@Email", email);
                        cmd.Parameters.AddWithValue("@Review", reviewText);
                        cmd.Parameters.AddWithValue("@Rating", rating);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occurred: " + ex.Message);
                throw; 
            }
        }

        public bool ReviewExists(int bookId, string email)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT COUNT(1) FROM Review WHERE bookId = @BookId AND email = @Email", con))
                {
                    cmd.Parameters.AddWithValue("@BookId", bookId);
                    cmd.Parameters.AddWithValue("@Email", email);
                    int count = (int)cmd.ExecuteScalar();
                    return count > 0;
                }
            }
        }

        // Get Books Purchased by a User
        public List<BookCopy> GetBooksPurchasedByUser(string userEmail)
        {
            List<BookCopy> bookCopies = new List<BookCopy>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBooksPurchasedByUser", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookCopies.Add(MapBookCopy(reader));
                        }
                    }
                }
            }

            return bookCopies;
        }

        // maps SQL data to appropriate BookCopy object
        private BookCopy MapBookCopy(SqlDataReader reader)
        {
            int bookId = Convert.ToInt32(reader["id"]);
            bool isEbook = Convert.ToBoolean(reader["isEbook"]);
            bool isActive = Convert.ToBoolean(reader["active"]);
            bool finishedReading = Convert.ToBoolean(reader["finishedReading"]);

            string title = reader["title"].ToString();
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
            string imageLink = reader["imageLink"].ToString();
            string previewLink = reader["previewLink"] != DBNull.Value ? reader["previewLink"].ToString() : null;
            var categories = GetCategoriesByBookId(bookId);
            var authors = GetAuthorsByBookId(bookId);
            decimal price = Convert.ToDecimal(reader["price"]);

            // Handle IsForSale as nullable since it applies only to physical books‹
            bool? isForSale = reader["isForSale"] != DBNull.Value ? (bool?)Convert.ToBoolean(reader["isForSale"]) : null;

            // Create and return a new BookCopy object
            return new BookCopy(
                copyId: copyId,
                bookId: bookId,
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
                authors: authors,
                ownerEmail: ownerEmail,
                price: price,
                isActive: isActive,
                imageLink: imageLink,
                previewLink: previewLink,
                finishedReading: finishedReading,
                isForSale: isForSale
            );
        }

        // Get categories for a specific book title
        private string[] GetCategoriesByBookId(int bookId)
        {
            List<string> categories = new List<string>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetCategoriesByBookId", con);  
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", bookId); 

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
                            int bookId;
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
                                cmd.Parameters.AddWithValue("@Price", book.Price);
                                cmd.Parameters.AddWithValue("@Active", book.Active);
                                cmd.Parameters.AddWithValue("@ImageLink", book.ImageLink);
                                cmd.Parameters.AddWithValue("@PreviewLink", book.IsEbook ? (object)book.PreviewLink ?? DBNull.Value : DBNull.Value);

                                bookId = Convert.ToInt32(cmd.ExecuteScalar());
                            }

                            // Add authors and map them to the book
                            foreach (var author in book.Authors)
                            {
                                int authorId = EnsureAuthorExists(con, transaction, author);

                                using (SqlCommand authorBookCmd = new SqlCommand("sp_AddBookAuthor", con, transaction))
                                {
                                    authorBookCmd.CommandType = CommandType.StoredProcedure;

                                    authorBookCmd.Parameters.AddWithValue("@BookId", bookId);
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

                                    categoryBookCmd.Parameters.AddWithValue("@BookId", bookId);
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

        //
        private int EnsureAuthorExists(SqlConnection con, SqlTransaction transaction, Author author)
        {
            // Check if the author already exists
            using (SqlCommand checkCmd = new SqlCommand("sp_CheckAuthorExists", con, transaction))
            {
                checkCmd.CommandType = CommandType.StoredProcedure;
                checkCmd.Parameters.AddWithValue("@Name", author.Name);

                object result = checkCmd.ExecuteScalar();

                if (result != null && result != DBNull.Value)
                {
                    return Convert.ToInt32(result);
                }
            }

            // If the author does not exist, insert a new author
            using (SqlCommand insertCmd = new SqlCommand("sp_AddAuthor", con, transaction))
            {
                insertCmd.CommandType = CommandType.StoredProcedure;

                insertCmd.Parameters.AddWithValue("@Name", author.Name);
                insertCmd.Parameters.AddWithValue("@Biography", author.Biography);
                insertCmd.Parameters.AddWithValue("@WikiLink", author.WikiLink);
                insertCmd.Parameters.AddWithValue("@PictureUrl", author.PictureUrl);

                // Create an output parameter to capture the newly inserted AuthorID
                SqlParameter idParameter = new SqlParameter("@AuthorID", SqlDbType.Int);
                idParameter.Direction = ParameterDirection.Output;
                insertCmd.Parameters.Add(idParameter);

                insertCmd.ExecuteNonQuery();

                // Return the new Author ID
                return Convert.ToInt32(idParameter.Value);
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

                cmd.Parameters.AddWithValue("@BookId", ebookCopy.Id);
                cmd.Parameters.AddWithValue("@OwnerEmail", (object)ebookCopy.OwnerEmail ?? DBNull.Value);

                // Return the new copy bookId
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }


        
        public int AddPhysBookCopy(BookCopy physBookCopy)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AddPhysBookCopy", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", physBookCopy.Id);
                cmd.Parameters.AddWithValue("@OwnerEmail", (object)physBookCopy.OwnerEmail ?? DBNull.Value);

                // Return the new copy bookId
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

        
        private Book MapBook(SqlDataReader reader)
        {
            return new Book(
                id: Convert.ToInt32(reader["id"]),
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
                categories: GetCategoriesByBookId(Convert.ToInt32(reader["id"])),
                authors: GetAuthorsByBookId(Convert.ToInt32(reader["id"])),
                price: Convert.ToDecimal(reader["price"]),
                active: Convert.ToBoolean(reader["active"]),
                imageLink: reader["imageLink"].ToString(),
                previewLink: reader["isEbook"] != DBNull.Value && Convert.ToBoolean(reader["isEbook"]) ? reader["previewLink"].ToString() : null // Include previewLink only if it's an eBook
            );
        }

        // Get authors for a specific book title
        private List<Author> GetAuthorsByBookId(int bookId)
        {
            List<Author> authors = new List<Author>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAuthorsByBookId", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", bookId);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        authors.Add(new Author(
                            id: Convert.ToInt32(reader["id"]),
                            name: reader["name"].ToString(),
                            biography: reader["biography"].ToString(),
                            wikiLink: reader["wikiLink"].ToString(),
                            pictureUrl: reader["PictureUrl"].ToString()
                        ));
                    }
                }
            }

            return authors;
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

        
        public void DeleteBook(int bookId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_DeleteBook", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", bookId); 

                cmd.ExecuteNonQuery();
            }
        }

        
        public List<Book> GetAllActiveBooks()
        {
            List<Book> books = new List<Book>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetAllActiveBooks", con))
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

        // update status of "finished reading" a certain book for certain user
        public bool UpdateFinishedReadingStatus(int copyId, string ownerEmail, bool isEbook, bool finishedReading)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateFinishedReading", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CopyId", copyId);
                cmd.Parameters.AddWithValue("@OwnerEmail", ownerEmail);
                cmd.Parameters.AddWithValue("@IsEbook", isEbook);
                cmd.Parameters.AddWithValue("@FinishedReading", finishedReading);

                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }

        // update status of "for sale" a certain book for certain user
        public bool UpdateSaleStatus(int copyId, string ownerEmail, bool isEbook, bool isForSale)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateSaleStatus", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CopyId", copyId);
                cmd.Parameters.AddWithValue("@OwnerEmail", ownerEmail);
                cmd.Parameters.AddWithValue("@IsEbook", isEbook);
                cmd.Parameters.AddWithValue("@IsForSale", isForSale);

                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }

        public bool UpdateLikeStatus(int bookId, string userEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateLikeStatus", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", bookId);
                cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                SqlParameter returnValue = new SqlParameter("@ReturnValue", SqlDbType.Int);
                returnValue.Direction = ParameterDirection.ReturnValue;
                cmd.Parameters.Add(returnValue);

                cmd.ExecuteNonQuery();

                int rowsAffected = (int)cmd.Parameters["@ReturnValue"].Value;
                return rowsAffected > 0;
            }
        }


        // Method to get the list of liked books by user
        public List<dynamic> GetLikedBooksByUser(string userEmail)
        {
            List<dynamic> likedBooks = new List<dynamic>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetLikedBooksByUser", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var authors = reader["Authors"].ToString().TrimEnd(',', ' ').Split(", ").Select(name => new { Name = name }).ToArray();
                            var book = new
                            {
                                BookId = Convert.ToInt32(reader["BookId"]),
                                Title = reader["Title"].ToString(),
                                Price = Convert.ToDecimal(reader["Price"]),
                                IsEbook = Convert.ToBoolean(reader["IsEbook"]),
                                ImageLink = reader["ImageLink"].ToString(),
                                Authors = authors
                            };
                            likedBooks.Add(book);
                        }
                    }
                }
            }

            return likedBooks;
        }

        public bool RemoveFromLikedBooks(int bookId, string userEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_RemoveFromLikedBooks", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", bookId);
                cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                // Execute the command and get the number of rows affected
                int rowsAffected = cmd.ExecuteNonQuery();

                // Return true if the command affected any rows (i.e., the book was removed)
                return rowsAffected > 0;
            }
        }

        public List<Dictionary<string, object>> GetAllBooksWithPurchaseCount()
        {
            List<Dictionary<string, object>> books = new List<Dictionary<string, object>>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllBooksWithPurchaseCount", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var book = new Dictionary<string, object>();

                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            book[reader.GetName(i)] = reader.GetValue(i);
                        }

                        books.Add(book);
                    }
                }
            }
            return books;
        }

        public void UpdateBookAdmin(int id, string title, string language, bool active)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateBookAdmin", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);
                cmd.Parameters.AddWithValue("@Title", title);
                cmd.Parameters.AddWithValue("@Language", language);
                cmd.Parameters.AddWithValue("@Active", active);

                cmd.ExecuteNonQuery();
            }
        }

        public int GetTotalBooksCount()
        {
            int totalBooks = 0;

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetTotalBooksCount", con);
                cmd.CommandType = CommandType.StoredProcedure;

                totalBooks = (int)cmd.ExecuteScalar();
            }

            return totalBooks;
        }

        public List<string> GetAllCategories()
        {
            List<string> categories = new List<string>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllCategories", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        categories.Add(reader["category"].ToString());
                    }
                }
            }

            return categories;
        }

        public List<dynamic> GetAllUsersPurchases()
        {
            List<dynamic> purchases = new List<dynamic>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllUsersPurchases", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    var purchase = new
                    {
                        UserEmail = reader["UserEmail"].ToString(),
                        BookId = Convert.ToInt32(reader["BookId"]),
                        BookTitle = reader["BookTitle"].ToString(),
                        IsEbook = Convert.ToBoolean(reader["IsEbook"]),
                        BookPrice = Convert.ToDecimal(reader["BookPrice"]),
                        Categories = reader["Categories"].ToString() 
                    };

                    purchases.Add(purchase);
                }
            }

            return purchases;
        }


    }
}
