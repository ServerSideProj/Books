using Backend.BL;
using Backend.DAL;

namespace Backend.BI
{
    public class Book
    {
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
        private Author[] authors;

        public Book(string title, string description, string language, float avgRating, int ratingCount,
                    string maturityRating, string infoLink, string publisher, bool isEbook,
                    DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, Author[] authors)
        {
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
        }

        // Default constructor
        public Book()
        {
        }

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
        public Author[] Authors { get => authors; set => authors = value; }


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

        public static List<Book> GetBooksByAuthor(string authorName)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetBooksByAuthor(authorName);
        }

        public static List<Review> GetReviewsByBook(string title)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetReviewsByBook(title);
        }

        public static List<Book> GetBooksByRatingRange(int minRating, int maxRating)
        {
            DBbook dbBook = new DBbook();
            return dbBook.GetBooksByRatingRange(minRating, maxRating);
        }

        public static void AddReview(string title, string email, string reviewText, int rating, bool finishedReading)
        {
            DBbook dbBook = new DBbook();
            dbBook.AddReview(title, email, reviewText, rating, finishedReading);
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

    }


}
