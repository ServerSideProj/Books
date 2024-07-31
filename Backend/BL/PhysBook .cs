using Backend.BI;

namespace Backend.BL
{
    public class PhysBook : Book
    {
        public PhysBook(string title, string description, string language, float avgRating, int ratingCount, string maturityRating, string infoLink, string publisher, DateOnly publishDate, int pageCount, string subtitle, Author[] authors, string[] categories, Review[] reviews)
            : base(title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher, false, publishDate, pageCount, subtitle, authors, categories, reviews)
        {
        }
    }
}
