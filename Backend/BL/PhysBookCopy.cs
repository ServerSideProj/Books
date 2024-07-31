using Backend.BI;

namespace Backend.BL
{
    public class PhysBookCopy : BookCopy
    {
        private bool isForSale;
        private decimal price;

        public PhysBookCopy(int copyId, string title, string ownerEmail, bool isForSale, decimal price)
            : base(copyId, title, ownerEmail)
        {
            IsForSale = isForSale;
            Price = price;
        }

        public bool IsForSale { get => isForSale; set => isForSale = value; }
        public decimal Price { get => price; set => price = value; }
    }
}
