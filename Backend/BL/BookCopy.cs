using Backend.BI;
using Backend.DAL;
using System;

public class BookCopy : Book
{
    private int copyId;
    private string ownerEmail;

    // Default constructor
    public BookCopy() : base() { }

    // Simplified constructor
    public BookCopy(int copyId, int bookId, string ownerEmail)  // Changed from title to bookId
        : base(bookId, "", "", "", 0, 0, "", "", "", true, DateTime.MinValue, 0, "", null, null, 0)  // Updated constructor to include bookId
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
    }

    public BookCopy(int copyId, int bookId,string title ,string description, string language, float avgRating,
                    int ratingCount, string maturityRating, string infoLink, string publisher,
                    bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, List<Author> authors, string ownerEmail, decimal price)
        : base(bookId,title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher,
               isEbook, publishDate, pageCount, subtitle, categories, authors, price) 
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
    }

    public int CopyId { get => copyId; set => copyId = value; }
    public string OwnerEmail { get => ownerEmail; set => ownerEmail = value; }


    public static List<Book> GetBooksPurchasedByUser(string userEmail)
    {
        DBbook dbBook = new DBbook();
        return dbBook.GetBooksPurchasedByUser(userEmail);
    }

    public static int AddEbookCopy(BookCopy ebookCopy)
    {
        DBbook dbBook = new DBbook();
        return dbBook.AddEbookCopy(ebookCopy);
    }
}
