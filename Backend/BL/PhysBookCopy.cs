//using Backend.DAL;

//namespace Backend.BL
//{
//    public class PhysBookCopy : BookCopy
//    {
//        private bool isForSale;

//        // Default constructor
//        public PhysBookCopy() : base() { }

//        public PhysBookCopy(int copyId, int bookId, string ownerEmail, bool isForSale, bool finishedReading)
//            : base(copyId, bookId, ownerEmail, finishedReading)
//        {
//            IsForSale = isForSale;
//            IsActive = true; 
//        }

//        public PhysBookCopy(int copyId, int bookId, string title, string description, string language, float avgRating,
//                            int ratingCount, string maturityRating, string infoLink, string publisher,
//                            bool isEbook, DateTime publishDate, int pageCount, string subtitle,
//                            string[] categories, List<Author> authors, string ownerEmail, bool isForSale, decimal price, bool isActive, string imageLink, string previewLink, bool finishedReading)
//            : base(copyId, bookId, title, description, language, avgRating, ratingCount, maturityRating,
//                   infoLink, publisher, isEbook, publishDate, pageCount, subtitle, categories,
//                   authors, ownerEmail, price, isActive, imageLink, previewLink, finishedReading)
//        {
//            IsForSale = isForSale;
//        }

//        public bool IsForSale { get => isForSale; set => isForSale = value; }

//        public static int AddPhysBookCopy(PhysBookCopy physBookCopy)
//        {
//            DBbook dbBook = new DBbook();
//            return dbBook.AddPhysBookCopy(physBookCopy);
//        }

//        public static List<BookCopy> GetAllPhysBookCopies()
//        {
//            DBbook dbBook = new DBbook();
//            return dbBook.GetAllPhysBookCopies();
//        }
//    }
//}
