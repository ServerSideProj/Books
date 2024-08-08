using Backend.BL;
using Backend.DAL;
using System;

namespace Backend.BL
{
    public class PhysBookCopy : BookCopy
    {
        private bool isForSale;

        // Default constructor
        public PhysBookCopy() : base() { }

        // Simplified constructor
        public PhysBookCopy(int copyId, int bookId, string ownerEmail, bool isForSale)  
            : base(copyId, bookId, ownerEmail) 
        {
            IsForSale = isForSale;
        }

        public PhysBookCopy(int copyId, int bookId, string title, string description, string language, float avgRating,
                            int ratingCount, string maturityRating, string infoLink, string publisher,
                            bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                            string[] categories, List<Author> authors, string ownerEmail, bool isForSale, decimal price, bool isActive, string imageLink, string previewLink) 
            : base(copyId, bookId, title, description, language, avgRating, ratingCount, maturityRating,
                   infoLink, publisher, isEbook, publishDate, pageCount, subtitle, categories,
                   authors, ownerEmail, price, isActive, imageLink, previewLink)  
        {
            IsForSale = isForSale;
        }

        public bool IsForSale { get => isForSale; set => isForSale = value; }

        public static int AddPhysBookCopy(PhysBookCopy physBookCopy)
        {
            DBbook dbBook = new DBbook();
            return dbBook.AddPhysBookCopy(physBookCopy);
        }
    }
}
