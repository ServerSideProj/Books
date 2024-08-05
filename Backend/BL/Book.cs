using Backend.BL;
using Backend.DAL;
using System;
using System.Collections.Generic;

namespace Backend.BI
{
    public class Book
    {
        private int id;  // Book ID
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
        private List<Author> authors;  // Changed to a list of Author objects
        private decimal price; // Price in dollars

        public Book(int id, string title, string description, string language, float avgRating, int ratingCount,
                    string maturityRating, string infoLink, string publisher, bool isEbook,
                    DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, List<Author> authors, decimal price)  // Changed to a list of Author objects
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
            Authors = authors;  // Changed to a list of Author objects
            Price = price;
        }

        // Default constructor
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
        public List<Author> Authors { get => authors; set => authors = value; }  // Changed to a list of Author objects
        public decimal Price { get => price; set => price = value; }


        public static List<Book> GetTop5PopularPhysBooks()
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetTop5PopularPhysBooks();
        }

        public static List<Book> GetTop5PopularEbooks()
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetTop5PopularEbooks();
        }

        public static List<Book> GetBooksByCategories(string categories)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetBooksByCategories(categories);
        }

        public static List<Book> GetBooksByAuthor(int authorId)  // Changed to authorId
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetBooksByAuthor(authorId);  // Updated method call
        }

        public static List<Review> GetReviewsByBook(int bookId)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetReviewsByBook(bookId);
        }

        public static List<Book> GetBooksByRatingRange(int minRating, int maxRating)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetBooksByRatingRange(minRating, maxRating);
        }

        public static void AddReview(int bookId, string email, string reviewText, int rating, bool finishedReading)
        {
            DBbook dbBook = new DBbook();
            dbBook.AddReview(bookId, email, reviewText, rating, finishedReading);
        }

        public static void AddBooks(List<Book> books)
        {
            DBbook dbBook = new DBbook();
            dbBook.AddBooks(books);
        }

        public static List<Book> GetBooksPurchasedByUserWithSaleStatus(string userEmail)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetBooksPurchasedByUserWithSaleStatus(userEmail);
        }

        public static List<Book> GetAllBooks()
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetAllBooks();
        }

        public static List<BookCopy> GetAllEBookCopies()
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetAllEbookCopies();
        }

        public static List<BookCopy> GetAllPhysBookCopies()
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetAllPhysBookCopies();
        }

        public static void DeleteBook(int bookId)
        {
            DBbook dbBook = new DBbook();
            dbBook.DeleteBook(bookId);
        }
    }
}
