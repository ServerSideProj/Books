using Backend.BL;
using Backend.DAL;
using System;
using System.Collections.Generic;

public class BookCopy : Book
{
    private int copyId;
    private string ownerEmail;
    private bool isActive;  
    private bool finishedReading;
    private static readonly DBbook dbBook = new DBbook();

    // Default constructor
    public BookCopy() : base() { }

    public BookCopy(int copyId, int bookId, string ownerEmail, bool finishedReading)
    : base(bookId, "", "", "", 0, 0, "", "", "", true, DateTime.MinValue, 0, "", null, null, 0, true, "", "")
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
        IsActive = true; 
        FinishedReading = finishedReading;
    }


    public BookCopy(int copyId, int bookId, string title, string description, string language, float avgRating,
                    int ratingCount, string maturityRating, string infoLink, string publisher,
                    bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, List<Author> authors, string ownerEmail, decimal price, bool isActive, string imageLink, string previewLink, bool finishedReading)  
        : base(bookId, title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher,
               isEbook, publishDate, pageCount, subtitle, categories, authors, price, isActive, imageLink, previewLink)
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
        IsActive = isActive;
        FinishedReading = finishedReading;
    }

    public int CopyId { get => copyId; set => copyId = value; }
    public string OwnerEmail { get => ownerEmail; set => ownerEmail = value; }
    public bool IsActive { get => isActive; set => isActive = value; }
    public bool FinishedReading { get => finishedReading; set => finishedReading = value; }

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
}
