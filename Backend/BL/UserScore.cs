using Backend.DAL;

namespace Backend.BL
{
    public class UserScore
    {
        private int quizId;
        private string userMail;
        private string username;
        private int score;
        private int timeInSeconds;

        public UserScore()
        {
        }

        public UserScore(int quizId, string userMail, int score, int timeInSeconds, string username)
        {
            QuizId = quizId;
            UserMail = userMail;
            Score = score;
            TimeInSeconds = timeInSeconds;
            Username = username;
        }

        public UserScore(int quizId, string userMail, int score, int timeInSeconds)
        {
            QuizId = quizId;
            UserMail = userMail;
            Score = score;
            TimeInSeconds = timeInSeconds;
            Username = "";
        }

        public int QuizId { get => quizId; set => quizId = value; }
        public string UserMail { get => userMail; set => userMail = value; }
        public int Score { get => score; set => score = value; }
        public int TimeInSeconds { get => timeInSeconds; set => timeInSeconds = value; }
        public string Username { get => username; set => username = value; }

        public void Save()
        {
            DBquiz dbquiz = new DBquiz();
            dbquiz.SaveUserScore(this);
        }
    }
}
