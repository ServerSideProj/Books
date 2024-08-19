﻿using Backend.BL;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {

        [HttpGet("all-authors")]
        public IActionResult GetAllAuthors()
        {
            try
            {
                List<Author> authors = Author.GetAllAuthors();
                return Ok(authors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpGet("total-authors-count")]
        public IActionResult GetTotalAuthorsCount()
        {
            try
            {
                int totalAuthors = Author.GetTotalAuthorsCount();
                return Ok(new { TotalAuthors = totalAuthors });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetAuthorById(int id)
        {
            List<Author> authors = Author.GetAllAuthors();
            var author = authors.FirstOrDefault(a => a.Id == id);

            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }

        [HttpGet("authors-with-book-count")]
        public IActionResult GetAuthorWithBookCount()
        {
            var authorsInfo = Author.GetAuthorWithBookCount();
            if (authorsInfo != null)
            {
                return Ok(authorsInfo);
            }
            else
            {
                return NotFound(new { Message = "Authors not found." });
            }
        }

        [HttpPost("update-authors")]
        public IActionResult UpdateAuthors([FromBody] List<Author> authors)
        {
            try
            {
                foreach (var author in authors)
                {
                    Author.UpdateAuthor(author);
                }
                return Ok(new { Message = "Authors updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult AddAuthor([FromBody] Author author)
        {
            try
            {
                Author.AddAuthor(author);
                return Ok(new { Message = "Author added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
        
        [HttpDelete("{authorId}")]
        public IActionResult DeleteAuthor(int authorId)
        {
            try
            {
                Author.DeleteAuthor(authorId);
                return Ok(new { Message = "Author deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
