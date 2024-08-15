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

        [HttpGet("daily-quiz/{userEmail}")]
        public IActionResult GetDailyQuiz(string userEmail)
        {
            if (string.IsNullOrEmpty(userEmail))
            {
                return BadRequest("User email is required.");
            }

            var result = Quiz.GetDailyQuiz(userEmail);

            if (result.userScore != null)
            {
                return Ok(new
                {
                    message = "You have already taken today's quiz.",
                    quiz = result.quiz,
                    score = result.userScore.Score,
                    timeInSeconds = result.userScore.TimeInSeconds
                });
            }
            else
            {
                // New quiz generated for the user
                return Ok(new
                {
                    message = "Here is your daily quiz.",
                    quiz = result.quiz
                });
            }
        }

        [HttpPost]
        [Route("api/questions/save")]
        public IActionResult SaveQuestions()
        {
            Question.GenerateQuestions();
            return Ok("Questions saved successfully.");
        }

        [HttpPost("generate")]
        public IActionResult GenerateQuizzes([FromQuery] int numberOfQuizzes)
        {
            try
            {
                int createdQuizzesCount = Quiz.GenerateQuizzes(numberOfQuizzes);

                return Ok(new
                {
                    Message = $"{createdQuizzesCount} quizzes were successfully created."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost("save-score")]
        public IActionResult SaveUserScore([FromBody] UserScore userScore)
        {
            if (userScore == null)
            {
                return BadRequest("User score data is required.");
            }

            try
            {
                userScore.Save();
                return Ok("User score saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
