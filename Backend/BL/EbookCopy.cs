//using System;
//namespace Backend.BL
//{
//    public class EbookCopy : BookCopy
//    {
//        public string PreviewLink { get; set; }

//        // Default constructor
//        public EbookCopy() : base() { }

//        // Constructor for database mapping
//        public EbookCopy(int copyId, int bookId, string ownerEmail, bool finishedReading, string previewLink)
//            : base(copyId, bookId, ownerEmail, finishedReading)
//        {
//            PreviewLink = previewLink;
//        }

//        // Constructor for full properties
//        public EbookCopy(int copyId, int bookId, string title, string description, string language, float avgRating,
//                         int ratingCount, string maturityRating, string infoLink, string publisher,
//                         bool isEbook, DateTime publishDate, int pageCount, string subtitle,
//                         string[] categories, List<Author> authors, string ownerEmail, decimal price, bool isActive,
//                         string imageLink, string previewLink, bool finishedReading)
//            : base(copyId, bookId, title, description, language, avgRating, ratingCount, maturityRating,
//                   infoLink, publisher, isEbook, publishDate, pageCount, subtitle, categories, authors,
//                   ownerEmail, price, isActive, imageLink, previewLink, finishedReading)
//        {
//            PreviewLink = previewLink;
//        }
//    }
//}


