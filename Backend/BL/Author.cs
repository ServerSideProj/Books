using Backend.Controllers;
using Backend.DAL;

namespace Backend.BI
{
    public class Author
    {
        private int id;
        private string name;
        private string biography;
        private string wikiLink;

        private static readonly DBauthor dbAuthor = new DBauthor(); 

        public Author(int id, string name, string biography, string wikiLink)
        {
            Id = id;
            Name = name;
            Biography = biography;
            WikiLink = wikiLink;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Biography { get => biography; set => biography = value; }
        public string WikiLink { get => wikiLink; set => wikiLink = value; }

        public static void AddAuthor(Author author)
        {
            dbAuthor.AddAuthor(author);
        }

        public static void DeleteAuthor(int authorId)
        {
            dbAuthor.DeleteAuthor(authorId); 
        }
    }
}
