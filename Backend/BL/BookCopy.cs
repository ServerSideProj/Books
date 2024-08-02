using Backend.BI;
using Backend.DAL;

public class BookCopy : Book
{
    private int copyId;
    private string ownerEmail;

    // Default constructor
    public BookCopy() : base() { }

    // Simplified constructor
    public BookCopy(int copyId, string title, string ownerEmail)
        : base(title, "", "", 0, 0, "", "", "", true, DateTime.MinValue, 0, "", null, null)
    {
        CopyId = copyId;
        OwnerEmail = ownerEmail;
    }



    public BookCopy(int copyId, string title, string description, string language, float avgRating,
                    int ratingCount, string maturityRating, string infoLink, string publisher,
                    bool isEbook, DateTime publishDate, int pageCount, string subtitle,
                    string[] categories, Author[] authors, string ownerEmail)
        : base(title, description, language, avgRating, ratingCount, maturityRating, infoLink, publisher,
               isEbook, publishDate, pageCount, subtitle, categories, authors)
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