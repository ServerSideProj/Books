namespace Backend.BL
{
    public class UserScore
    {
        private int quizId;
        private string userMail;
        private int score;
        private int timeInSeconds;

        public UserScore(int quizId, string userMail, int score, int timeInSeconds)
        {
            QuizId = quizId;
            UserMail = userMail;
            Score = score;
            TimeInSeconds = timeInSeconds;
        }

        public int QuizId { get => quizId; set => quizId = value; }
        public string UserMail { get => userMail; set => userMail = value; }
        public int Score { get => score; set => score = value; }
        public int TimeInSeconds { get => timeInSeconds; set => timeInSeconds = value; }
    }
}
