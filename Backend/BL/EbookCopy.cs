using System;
namespace Backend.BL
{
    public class EbookCopy : BookCopy
    {
        public string PreviewLink { get; set; }

        public EbookCopy() : base() { }

        public EbookCopy(int copyId, int bookId, string ownerEmail, bool finishedReading, string previewLink)
            : base(copyId, bookId, ownerEmail, finishedReading)
        {
            PreviewLink = previewLink;
        }
    }

}

