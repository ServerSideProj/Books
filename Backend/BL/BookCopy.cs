using Backend.BI;
using Backend.DAL;
using System;
using System.Collections.Generic;

public class BookCopy : Book
{
    private int copyId;
    private string ownerEmail;
    private bool isActive;  // Added isActive property
    private static readonly DBbook dbBook = new DBbook();

    // Default constructor
    public BookCopy() : base() { }

    // Simplified constructor
    public BookCopy(int copyId, int bookId, string ownerEmail)  // Added isActive parameter
        : base(bookId, "", "", "", 0, 0, "", "", "", true, DateTime.MinValue, 0, "", null, null, 0, true,"")
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
        IsActive = isActive;  // Set isActive
    }

    public BookCopy(int copyId, int bookId, string title, string description, string language, float avgRating,
                    int ratingCount, string maturityRating, string infoLink, string publisher,
                    bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, List<Author> authors, string ownerEmail, decimal price, bool isActive, string imageLink)  // Added isActive parameter
        : base(bookId, title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher,
               isEbook, publishDate, pageCount, subtitle, categories, authors, price, isActive, imageLink)
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
        IsActive = isActive;  // Set isActive
    }

    public int CopyId { get => copyId; set => copyId = value; }
    public string OwnerEmail { get => ownerEmail; set => ownerEmail = value; }
    public bool IsActive { get => isActive; set => isActive = value; }  // Added isActive property getter and setter

    public static List<Book> GetBooksPurchasedByUser(string userEmail)
    {
        return dbBook.GetBooksPurchasedByUser(userEmail);
    }

    public static int AddEbookCopy(BookCopy ebookCopy)
    {
        return dbBook.AddEbookCopy(ebookCopy);
    }
}
