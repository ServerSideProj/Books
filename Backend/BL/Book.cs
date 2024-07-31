using Backend.BL;

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
        private DateOnly publishDate;
        private int pageCount;
        private string subtitle;
        private Author[] authors;
        private string[] categories;
        private Review[] reviews;

        public Book(string title, string description, string language, float avgRating, int ratingCount, string maturityRating, string infoLink, string publisher, bool isEbook, DateOnly publishDate, int pageCount, string subtitle, Author[] authors, string[] categories, Review[] reviews)
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
            Authors = authors;
            Categories = categories;
            Reviews = reviews;
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
        public DateOnly PublishDate { get => publishDate; set => publishDate = value; }
        public int PageCount { get => pageCount; set => pageCount = value; }
        public string Subtitle { get => subtitle; set => subtitle = value; }
        public Author[] Authors { get => authors; set => authors = value; }
        public string[] Categories { get => categories; set => categories = value; }
        public Review[] Reviews { get => reviews; set => reviews = value; }
    }
}
