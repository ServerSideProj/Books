using Backend.DAL;

namespace Backend.BL
{
    public class Quiz
    {
        private int quizId;
        private Question[] questions;
        static int startQuizId = 10;
        static int currentQuizId = 10;
        static DateTime startDate = new DateTime(2024, 8, 10);


        private static readonly DBquiz dbquiz = new DBquiz();

        public Quiz(int quizId, Question[] questions)
        {
            QuizId = quizId;
            Questions = questions;
        }

        public int QuizId { get => quizId; set => quizId = value; }
        public Question[] Questions { get => questions; set => questions = value; }
        public static int CurrentQuizId { get => currentQuizId; set => currentQuizId = value; }

        public static int GenerateQuizzes(int numberOfQuizzes)
        {
            return dbquiz.GenerateQuizzes(numberOfQuizzes);
        }

        public static void GetCurrentQuizId()
        {
            startDate = new DateTime(2024, 8, 10);
            CurrentQuizId = startQuizId + (DateTime.Today - startDate).Days;
        }

        public static (Quiz quiz, UserScore userScore) GetDailyQuiz(string userEmail)
        {
            GetCurrentQuizId();
            return dbquiz.GetDailyQuiz(userEmail, CurrentQuizId);  
        }
    }
}
