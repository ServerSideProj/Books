using Microsoft.AspNetCore.Mvc;
using Backend.BL;
using System.Collections.Generic;
using System.Text.Json;
using static System.Reflection.Metadata.BlobBuilder;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        [HttpGet("all-books")]
        public ActionResult<List<Book>> GetAllBooks()
        {
            List<Book> books = Book.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("popular-physical-books")]
        public ActionResult<List<Book>> GetTop5PopularPhysBooks()
        {
            List<Book> books = Book.GetTop5PopularPhysBooks();
            return Ok(books);
        }

        [HttpGet("popular-digital-books")]
        public ActionResult<List<Book>> GetTop5PopularEbooks()
        {
            List<Book> books = Book.GetTop5PopularEbooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBookById(int id)
        {
            List<Book> books = Book.GetAllBooks();
            var book = books.FirstOrDefault(b => b.Id == id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpGet("by-categories")]
        public ActionResult<List<Book>> GetBooksByCategories([FromQuery] string categories)
        {
            List<Book> books = Book.GetBooksByCategories(categories);
            return Ok(books);
        }

        [HttpGet("reviews/{bookId}")]
        public ActionResult<List<Review>> GetReviewsByBook(int bookId)
        {
            List<Review> reviews = Book.GetReviewsByBook(bookId);
            return Ok(reviews);
        }

        [HttpGet("by-author")]
        public ActionResult<List<Book>> GetBooksByAuthor([FromQuery] int authorId) 
        {
            List<Book> books = Book.GetBooksByAuthor(authorId);  
            return Ok(books);
        }

        [HttpGet("by-rating")]
        public ActionResult<List<Book>> GetBooksByRatingRange([FromQuery] int minRating, [FromQuery] int maxRating)
        {
            List<Book> books = Book.GetBooksByRatingRange(minRating, maxRating);
            return Ok(books);
        }


        [HttpGet("all-active-books")]
        public ActionResult<List<Book>> GetAllActiveBooks()
        {
            List<Book> books = Book.GetAllActiveBooks();
            return Ok(books);
        }

        [HttpGet("ebook-copies")]
        public ActionResult<List<BookCopy>> GetAllEBookCopies()
        {
            List<BookCopy> books = BookCopy.GetAllEBookCopies();
            return Ok(books);
        }

        [HttpGet("physical-copies")]
        public ActionResult<List<BookCopy>> GetAllPhysBookCopies()
        {
            List<BookCopy> books = BookCopy.GetAllPhysBookCopies();
            return Ok(books);
        }

        [HttpGet("user-purchases/{userEmail}")]
        public ActionResult<List<BookCopy>> GetBooksPurchasedByUser(string userEmail)
        {
            var bookCopies = BookCopy.GetBooksPurchasedByUser(userEmail);
            return Ok(bookCopies);
        }

        [HttpGet("get-liked-books")]
        public IActionResult GetLikedBooks(string userEmail)
        {
            if (string.IsNullOrEmpty(userEmail))
            {
                return BadRequest(new { message = "Invalid user email." });
            }

            List<dynamic> likedBooks = Book.GetLikedBooksByUser(userEmail);

            if (likedBooks == null || likedBooks.Count == 0)
            {
                return NotFound(new { message = "No liked books found for the user." });
            }

            return Ok(likedBooks);
        }

        [HttpPost("review")]
        public ActionResult AddReview([FromBody] Review review)
        {
            Book.AddReview(review.BookId, review.Email, review.ReviewText, review.Rating); 
            return Ok("Review added successfully.");
        }

        [HttpPost("add-books")]
        public ActionResult AddBooks([FromBody] List<Book> books)
        {
            Book.AddBooks(books);
            return Ok("Books added successfully.");
        }

        [HttpPost("add-ebook-copy")]
        public ActionResult<int> AddEbookCopy([FromBody] JsonElement bookcopy)
        {
            int bookId = bookcopy.GetProperty("BookId").GetInt32();
            string ownerEmail = bookcopy.GetProperty("OwnerEmail").GetString();

            BookCopy ebookCopy = new BookCopy(0, bookId, ownerEmail, false);  
            int copyId = BookCopy.AddEbookCopy(ebookCopy);

            return Ok(new { message = "Ebook copy added successfully.", CopyId = copyId });
        }

        [HttpPost("add-physbook-copy")]
        public ActionResult<int> AddPhysBookCopy([FromBody] JsonElement bookcopy)
        {
            int bookId = bookcopy.GetProperty("BookId").GetInt32();
            string ownerEmail = bookcopy.GetProperty("OwnerEmail").GetString();

            BookCopy physBookCopy = new BookCopy(0, bookId, ownerEmail, false, false);  
            int copyId = BookCopy.AddPhysBookCopy(physBookCopy);

            return Ok(new { message = "Physical book copy added successfully.", CopyId = copyId });
        }

        [HttpPost("update-finished-reading")]
        public IActionResult UpdateFinishedReading(int copyId, string userEmail, bool isEbook, bool finishedReading)
        {
            if (copyId <= 0 || string.IsNullOrEmpty(userEmail))
            {
                return BadRequest(new { message = "Invalid request data." });
            }

            bool success = BookCopy.UpdateFinishedReadingStatus(copyId, userEmail, isEbook, finishedReading);

            if (success)
            {
                return Ok(new { message = "Finished reading status updated successfully." });
            }
            else
            {
                return BadRequest(new { message = "Failed to update finished reading status." });
            }
        }

        [HttpPost("update-sale-status")]
        public IActionResult UpdateSaleStatus(int copyId, string userEmail, bool isEbook, bool isForSale)
        {
            if (copyId <= 0 || string.IsNullOrEmpty(userEmail))
            {
                return BadRequest(new { message = "Invalid request data." });
            }

            bool success = BookCopy.UpdateSaleStatus(copyId, userEmail, isEbook, isForSale);

            if (success)
            {
                return Ok(new { message = "Sale status updated successfully." });
            }
            else
            {
                return BadRequest(new { message = "Failed to update sale status." });
            }
        }

        [HttpPost("update-like-status")]
        public IActionResult UpdateLikeStatus(int bookId, string userEmail)
        {
            if (bookId <= 0 || string.IsNullOrEmpty(userEmail))
            {
                return BadRequest(new { message = "Invalid request data." });
            }

            bool success = Book.UpdateLikeStatus(bookId, userEmail);

            if (success)
            {
                return Ok(new { message = "Like status updated successfully." });
            }
            else
            {
                return BadRequest(new { message = "Failed to update like status." });
            }
        }

        [HttpDelete("{bookId}")]
        public IActionResult DeleteBook(int bookId)  
        {
            try
            {
                Book.DeleteBook(bookId); 
                return Ok(new { Message = "Book deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
