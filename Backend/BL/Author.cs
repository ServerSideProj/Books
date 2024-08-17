using Backend.Controllers;
using Backend.DAL;
using System.Collections.Generic;

namespace Backend.BL
{
    public class Author
    {
        private int id;
        private string name;
        private string biography;
        private string wikiLink;
        private string pictureUrl; 

        private static readonly DBauthor dbAuthor = new DBauthor();


        public Author(int id, string name, string biography, string wikiLink, string pictureUrl)
        {
            Id = id;
            Name = name;
            Biography = biography;
            WikiLink = wikiLink;
            PictureUrl = pictureUrl; 
        }

        public Author(string name)
        {
            Id = 0;
            Name = name;
            Biography = "Biography not available";
            WikiLink = "N/A";
            PictureUrl = "N/A";
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Biography { get => biography; set => biography = value; }
        public string WikiLink { get => wikiLink; set => wikiLink = value; }
        public string PictureUrl { get => pictureUrl; set => pictureUrl = value; } 

        public static void AddAuthor(Author author)
        {
            dbAuthor.AddAuthor(author);
        }

        public static void DeleteAuthor(int authorId)
        {
            dbAuthor.DeleteAuthor(authorId);
        }

        public static List<Author> GetAllAuthors()
        {
            return dbAuthor.GetAllAuthors();
        }

        public static void UpdateAuthor(Author author)
        {
            dbAuthor.UpdateAuthor(author);
        }

        public static IEnumerable<object> GetAuthorWithBookCount()
        {
            return dbAuthor.GetAuthorWithBookCount();
        }

    }
}
