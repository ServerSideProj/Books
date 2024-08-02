using Backend.BI;
using Backend.DAL;

namespace Backend.BL
{
    public class PhysBookCopy : BookCopy
    {
        private bool isForSale;
        private decimal price;

        // Default constructor
        public PhysBookCopy() : base() { }

        // Simplified constructor
        public PhysBookCopy(int copyId, string title, string ownerEmail, bool isForSale, decimal price)
            : base(copyId, title, ownerEmail)
        {
            IsForSale = isForSale;
            Price = price;
        }

        public PhysBookCopy(int copyId, string title, string description, string language, float avgRating,
                            int ratingCount, string maturityRating, string infoLink, string publisher,
                            bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                            string[] categories, Author[] authors, string ownerEmail, bool isForSale,
                            decimal price)
            : base(copyId, title, description, language, avgRating, ratingCount, maturityRating,
                   infoLink, publisher, isEbook, publishDate, pageCount, subtitle, categories,
                   authors, ownerEmail)
        {
            IsForSale = isForSale;
            Price = price;
        }

        public bool IsForSale { get => isForSale; set => isForSale = value; }
        public decimal Price { get => price; set => price = value; }


        public static int AddPhysBookCopy(PhysBookCopy physBookCopy)
        {
            DBbook dbBook = new DBbook();
            return dbBook.AddPhysBookCopy(physBookCopy);
        }
    }
}
