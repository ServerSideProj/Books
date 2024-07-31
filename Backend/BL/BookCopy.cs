namespace Backend.BI
{
    public class BookCopy
    {
        private int copyId;
        private string title;
        private string ownerEmail;

        public BookCopy(int copyId, string title, string ownerEmail)
        {
            CopyId = copyId;
            Title = title;
            OwnerEmail = ownerEmail;
        }

        public int CopyId { get => copyId; set => copyId = value; }
        public string Title { get => title; set => title = value; }
        public string OwnerEmail { get => ownerEmail; set => ownerEmail = value; }
    }
}
