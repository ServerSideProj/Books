namespace Backend.BI
{
    public class Author
    {
        private int id;
        private string name;
        private Book[] books;

        public Author(int id, string name, Book[] books)
        {
            Id = id;
            Name = name;
            Books = books;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public Book[] Books { get => books; set => books = value; }
    }
}
