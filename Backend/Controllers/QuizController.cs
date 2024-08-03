using Backend.BL;
using Backend.DAL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        [HttpPost]
        [Route("api/questions/save")]
        public IActionResult SaveQuestions()
        {
           Question.GenerateQuestions();
           return Ok("Questions saved successfully.");
        }
    }
}
