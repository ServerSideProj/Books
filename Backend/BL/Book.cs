﻿using Backend.BL;
using Backend.DAL;
using System;
using System.Collections.Generic;

namespace Backend.BL
{
    public class Book
    {
        private int id;
        private string title;
        private string description;
        private string language;
        private float avgRating;
        private int ratingCount;
        private string maturityRating;
        private string infoLink;
        private string publisher;
        private bool isEbook;
        private DateTime publishDate;
        private int pageCount;
        private string subtitle;
        private string[] categories;
        private List<Author> authors;
        private decimal price;
        private bool active;
        private string imageLink;
        private string previewLink;

        private static readonly DBbook dbBook = new DBbook();

        public Book(int id, string title, string description, string language, float avgRating, int ratingCount,
                    string maturityRating, string infoLink, string publisher, bool isEbook,
                    DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, List<Author> authors, decimal price, bool active,
                     string imageLink, string previewLink)
        {
            Id = id;
            Title = title;
            Description = description;
            Language = language;
            AvgRating = avgRating;
            RatingCount = ratingCount;
            MaturityRating = maturityRating;
            InfoLink = infoLink;
            Publisher = publisher;
            IsEbook = isEbook;
            PublishDate = publishDate;
            PageCount = pageCount;
            Subtitle = subtitle;
            Categories = categories;
            Authors = authors;
            Price = price;
            Active = active;
            ImageLink = imageLink;
            PreviewLink = previewLink;
        }

        public Book(string title,string description,string language,string[] categories,List<Author> authors,string imageLink)
        {
            Id = 0;
            Title = title;
            Description = description;
            Language = language;
            AvgRating = 0.0f;
            RatingCount = 0;
            MaturityRating = "Not Rated";
            InfoLink = "N/A";
            Publisher = "Unknown";
            IsEbook = false;
            PublishDate = DateTime.Now; // Default to current date and time
            PageCount = 0;
            Subtitle = "";
            Categories = categories;
            Authors = authors;
            Price = 5.0m;
            Active = true;
            ImageLink = imageLink;
            PreviewLink = "N/A";
        }

        public Book()
        {
        }

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Description { get => description; set => description = value; }
        public string Language { get => language; set => language = value; }
        public float AvgRating { get => avgRating; set => avgRating = value; }
        public int RatingCount { get => ratingCount; set => ratingCount = value; }
        public string MaturityRating { get => maturityRating; set => maturityRating = value; }
        public string InfoLink { get => infoLink; set => infoLink = value; }
        public string Publisher { get => publisher; set => publisher = value; }
        public bool IsEbook { get => isEbook; set => isEbook = value; }
        public DateTime PublishDate { get => publishDate; set => publishDate = value; }
        public int PageCount { get => pageCount; set => pageCount = value; }
        public string Subtitle { get => subtitle; set => subtitle = value; }
        public string[] Categories { get => categories; set => categories = value; }
        public List<Author> Authors { get => authors; set => authors = value; }
        public decimal Price { get => price; set => price = value; }
        public bool Active { get => active; set => active = value; }  
        public string ImageLink { get => imageLink; set => imageLink = value; }
        public string PreviewLink { get => previewLink; set => previewLink = value; }

        public static List<Book> GetTop5PopularPhysBooks()
        {
            return dbBook.GetTop5PopularPhysBooks();
        }

        public static List<Book> GetTop5PopularEbooks()
        {
            return dbBook.GetTop5PopularEbooks();
        }

        public static List<Book> GetBooksByCategories(string categories)
        {
            return dbBook.GetBooksByCategories(categories);
        }

        public static List<Book> GetBooksByAuthor(int authorId)
        {
            return dbBook.GetBooksByAuthor(authorId);
        }

        public static List<Review> GetReviewsByBook(int bookId)
        {
            return dbBook.GetReviewsByBook(bookId);
        }

        public static List<Book> GetBooksByRatingRange(int minRating, int maxRating)
        {
            return dbBook.GetBooksByRatingRange(minRating, maxRating);
        }

        public static void AddReview(int bookId, string email, string reviewText, int rating)
        {
            dbBook.AddReview(bookId, email, reviewText, rating);
        }

        public static bool ReviewExists(int bookId, string email)
        {
            return dbBook.ReviewExists(bookId, email);
        }

        public static void AddBooks(List<Book> books)
        {
            dbBook.AddBooks(books);
        }

        public static List<Book> GetAllBooks()
        {
            return dbBook.GetAllBooks();
        }

        public static List<Book> GetAllActiveBooks()
        {
            return dbBook.GetAllActiveBooks();
        }

        public static bool UpdateLikeStatus(int bookId, string userEmail)
        {
            return dbBook.UpdateLikeStatus(bookId, userEmail);
        }

        public static void DeleteBook(int bookId)
        {
            dbBook.DeleteBook(bookId);
        }

        // Method to get liked books by a user
        public static List<dynamic> GetLikedBooksByUser(string userEmail)
        {
            return dbBook.GetLikedBooksByUser(userEmail);
        }

        // Inside Book.cs or relevant class
        public static bool RemoveFromLikedBooks(int bookId, string userEmail)
        {
            return dbBook.RemoveFromLikedBooks(bookId, userEmail);
        }

        public static List<Dictionary<string, object>> GetAllBooksWithPurchaseCount()
        {
            return dbBook.GetAllBooksWithPurchaseCount();
        }

        public static void UpdateBookAdmin(int id, string title, string language, bool active)
        {
            dbBook.UpdateBookAdmin(id, title, language, active);
        }

        public static int GetTotalBooksCount()
        {
            return dbBook.GetTotalBooksCount();
        }

        public static List<string> GetAllCategories()
        {
            return dbBook.GetAllCategories();
        }

    }
}
