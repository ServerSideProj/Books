using Backend.BI;

namespace Backend.BL
{
    public class Ebook : Book
    {
        public Ebook(string title, string description, string language, float avgRating, int ratingCount, string maturityRating, string infoLink, string publisher, DateOnly publishDate, int pageCount, string subtitle, Author[] authors, string[] categories, Review[] reviews)
            : base(title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher, true, publishDate, pageCount, subtitle, authors, categories, reviews)
        {
        }
    }

}
