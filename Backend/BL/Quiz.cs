﻿using Backend.DAL;

namespace Backend.BL
{
    public class Quiz
    {
        private int quizId;
        private Question[] questions;

        public Quiz(int quizId, Question[] questions)
        {
            QuizId = quizId;
            Questions = questions;
        }

        public int QuizId { get => quizId; set => quizId = value; }
        public Question[] Questions { get => questions; set => questions = value; }

        public static int GenerateQuizzes(int numberOfQuizzes)
        {
            DBquiz dbquiz = new DBquiz();
            return dbquiz.GenerateQuizzes(numberOfQuizzes);
        }
    }
}
