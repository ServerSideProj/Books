namespace Backend.BL
{
    public class Question
    {
        private int questionId;
        private string questionText;
        private string answer;
        private string wrongAnswer1;
        private string wrongAnswer2;
        private string wrongAnswer3;

        public Question(int questionId, string questionText, string answer, string wrongAnswer1, string wrongAnswer2, string wrongAnswer3)
        {
            QuestionId = questionId;
            QuestionText = questionText;
            Answer = answer;
            WrongAnswer1 = wrongAnswer1;
            WrongAnswer2 = wrongAnswer2;
            WrongAnswer3 = wrongAnswer3;
        }

        public int QuestionId { get => questionId; set => questionId = value; }
        public string QuestionText { get => questionText; set => questionText = value; }
        public string Answer { get => answer; set => answer = value; }
        public string WrongAnswer1 { get => wrongAnswer1; set => wrongAnswer1 = value; }
        public string WrongAnswer2 { get => wrongAnswer2; set => wrongAnswer2 = value; }
        public string WrongAnswer3 { get => wrongAnswer3; set => wrongAnswer3 = value; }
    }

}
