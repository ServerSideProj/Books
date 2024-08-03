using Microsoft.AspNetCore.Mvc;
using Backend.BI;
using Backend.BL;
using System.Collections.Generic;
using System.Text.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
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

        [HttpGet("by-categories")]
        public ActionResult<List<Book>> GetBooksByCategories([FromQuery] string categories)
        {
            List<Book> books = Book.GetBooksByCategories(categories);
            return Ok(books);
        }

        [HttpGet("reviews/{title}")]
        public ActionResult<List<Review>> GetReviewsByBook(string title)
        {
            List<Review> reviews = Book.GetReviewsByBook(title);
            return Ok(reviews);
        }

        [HttpGet("by-author")]
        public ActionResult<List<Book>> GetBooksByAuthor([FromQuery] string authorName)
        {
            List<Book> books = Book.GetBooksByAuthor(authorName);
            return Ok(books);
        }

        [HttpGet("by-rating")]
        public ActionResult<List<Book>> GetBooksByRatingRange([FromQuery] int minRating, [FromQuery] int maxRating)
        {
            List<Book> books = Book.GetBooksByRatingRange(minRating, maxRating);
            return Ok(books);
        }

        [HttpPost("review")]
        public ActionResult AddReview([FromBody] Review review)
        {
            Book.AddReview(review.Title, review.Email, review.ReviewText, review.Rating, review.FinishedReading);
            return Ok("Review added successfully.");
        }

        [HttpGet("user-purchases/{userEmail}")]
        public ActionResult<List<Book>> GetBooksPurchasedByUser(string userEmail)
        {
            List<Book> books = BookCopy.GetBooksPurchasedByUser(userEmail);
            return Ok(books);
        }

        [HttpGet("user-purchases-sale-status/{userEmail}")]
        public ActionResult<List<Book>> GetBooksPurchasedByUserWithSaleStatus(string userEmail)
        {
            List<Book> books = Book.GetBooksPurchasedByUserWithSaleStatus(userEmail);
            return Ok(books);
        }

        [HttpPost("add-books")]
        public ActionResult AddBooks([FromBody] List<Book> books)
        {
            Book.AddBooks(books);
            return Ok("Books added successfully.");
        }

        [HttpPost("add-ebook-copy")]
        public ActionResult<int> AddEbookCopy([FromBody] JsonElement jsonRequest)
        {
            string title = jsonRequest.GetProperty("Title").GetString();
            string ownerEmail = jsonRequest.GetProperty("OwnerEmail").GetString();

            BookCopy ebookCopy = new BookCopy(0, title, ownerEmail);
            int copyId = BookCopy.AddEbookCopy(ebookCopy);

            return Ok(new { message = "Ebook copy added successfully.", CopyId = copyId });
        }

        [HttpPost("add-physbook-copy")]
        public ActionResult<int> AddPhysBookCopy([FromBody] JsonElement jsonRequest)
        {
            string title = jsonRequest.GetProperty("Title").GetString();
            string ownerEmail = jsonRequest.GetProperty("OwnerEmail").GetString();

            PhysBookCopy physBookCopy = new PhysBookCopy(0, title, ownerEmail, false, 0m);
            int copyId = PhysBookCopy.AddPhysBookCopy(physBookCopy);

            return Ok(new { message = "Physical book copy added successfully.", CopyId = copyId });
        }

        [HttpGet("all-books")]
        public ActionResult<List<Book>> GetAllBooks()
        {
            List<Book> books = Book.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("ebook-copies")]
        public ActionResult<List<BookCopy>> GetAllEBookCopies()
        {
            List<BookCopy> books = Book.GetAllEBookCopies();
            return Ok(books);
        }

        [HttpGet("physical-copies")]
        public ActionResult<List<BookCopy>> GetAllPhysBookCopies()
        {
            List<BookCopy> books = Book.GetAllPhysBookCopies();
            return Ok(books);
        }
    }
}
