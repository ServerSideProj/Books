using Backend.BL;
using Backend.DAL;
using System;
using System.Collections.Generic;

public class BookCopy : Book
{
    public int CopyId { get; set; }
    public string OwnerEmail { get; set; }
    public bool IsActive { get; set; }
    public bool FinishedReading { get; set; }
    public bool? IsForSale { get; set; }
    public string PreviewLink { get; set; }
    private static readonly DBbook dbBook = new DBbook();

    // Default constructor
    public BookCopy() : base() { }

    // Constructor for essential properties
    public BookCopy(int copyId, int bookId, string ownerEmail, bool finishedReading, bool? isForSale = null, string previewLink = null)
        : base(bookId, "", "", "", 0, 0, "", "", "", true, DateTime.MinValue, 0, "", null, null, 0, true, "", "")
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
        IsActive = true;
        FinishedReading = finishedReading;
        IsForSale = isForSale;
        PreviewLink = previewLink;
    }

    // Constructor with all properties
    public BookCopy(int copyId, int bookId, string title, string description, string language, float avgRating,
                    int ratingCount, string maturityRating, string infoLink, string publisher,
                    bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, List<Author> authors, string ownerEmail, decimal price, bool isActive,
                    string imageLink, string previewLink, bool finishedReading, bool? isForSale)
        : base(bookId, title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher,
               isEbook, publishDate, pageCount, subtitle, categories, authors, price, isActive, imageLink, previewLink)
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
        IsActive = isActive;
        FinishedReading = finishedReading;
        IsForSale = isForSale;
        PreviewLink = previewLink;
    }

    public static List<BookCopy> GetBooksPurchasedByUser(string userEmail)
    {
        return dbBook.GetBooksPurchasedByUser(userEmail);
    }

    public static int AddEbookCopy(BookCopy ebookCopy)
    {
        return dbBook.AddEbookCopy(ebookCopy);
    }

    public static List<BookCopy> GetAllEBookCopies()
    {
        return dbBook.GetAllEbookCopies();
    }

    public static int AddPhysBookCopy(BookCopy physBookCopy)
    {
        DBbook dbBook = new DBbook();
        return dbBook.AddPhysBookCopy(physBookCopy);
    }

    public static List<BookCopy> GetAllPhysBookCopies()
    {
        DBbook dbBook = new DBbook();
        return dbBook.GetAllPhysBookCopies();
    }

    public static bool UpdateFinishedReadingStatus(int copyId, string userEmail, bool isEbook, bool finishedReading)
    {
        DBbook dbBook = new DBbook();
        return dbBook.UpdateFinishedReadingStatus(copyId, userEmail, isEbook, finishedReading);
    }

    public static bool UpdateSaleStatus(int copyId, string userEmail, bool isEbook, bool isForSale)
    {
        DBbook dbBook = new DBbook();
        return dbBook.UpdateSaleStatus(copyId, userEmail, isEbook, isForSale);
    }

}
