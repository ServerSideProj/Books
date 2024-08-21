using Backend.BL;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;

namespace Backend.DAL
{
    public class DBquiz : DBservices
    {
        public void SaveQuestions(List<Question> questions)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                foreach (var question in questions)
                {
                    using (SqlCommand cmd = new SqlCommand("sp_AddQuestion", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@QuestionText", question.QuestionText);
                        cmd.Parameters.AddWithValue("@Answer", question.Answer);
                        cmd.Parameters.AddWithValue("@WrongAnswer1", question.WrongAnswer1);
                        cmd.Parameters.AddWithValue("@WrongAnswer2", question.WrongAnswer2);
                        cmd.Parameters.AddWithValue("@WrongAnswer3", question.WrongAnswer3);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }

        public int GenerateQuizzes(int numberOfQuizzes)
        {
            int MaxFailures = 3; 
            int createdQuizzesCount = 0;
            int attempt = 0;

            while (createdQuizzesCount < numberOfQuizzes && attempt < MaxFailures)
            {
                attempt++;
                List<Question> newQuestions = FetchRandomQuestions(5); 

                if (newQuestions.Count == 5)
                {
                    SaveQuizToDatabase(newQuestions);
                    createdQuizzesCount++;
                }

                if (createdQuizzesCount < numberOfQuizzes)
                {
                    continue;
                }
            }

            if (createdQuizzesCount < numberOfQuizzes)
            {
                Console.WriteLine($"Warning: Could only generate {createdQuizzesCount} out of {numberOfQuizzes} requested quizzes.");
            }

            return createdQuizzesCount;
        }

        // method to fetch random questions from the database
        private List<Question> FetchRandomQuestions(int numberOfQuestions)
        {
            List<Question> questions = new List<Question>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetRandomQuizQuestions", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NumberOfQuestions", numberOfQuestions);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            questions.Add(new Question(
                                reader.GetInt32(reader.GetOrdinal("question_id")),
                                reader.GetString(reader.GetOrdinal("question")),
                                reader.GetString(reader.GetOrdinal("answer")),
                                reader.GetString(reader.GetOrdinal("wrongAnswer1")),
                                reader.GetString(reader.GetOrdinal("wrongAnswer2")),
                                reader.GetString(reader.GetOrdinal("wrongAnswer3"))
                            ));
                        }
                    }
                }
            }

            return questions;
        }

        private int SaveQuizToDatabase(List<Question> questions)
        {
            int quizId;

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_AddQuizWithQuestions", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@QuestionID1", questions[0].QuestionId);
                    cmd.Parameters.AddWithValue("@QuestionID2", questions[1].QuestionId);
                    cmd.Parameters.AddWithValue("@QuestionID3", questions[2].QuestionId);
                    cmd.Parameters.AddWithValue("@QuestionID4", questions[3].QuestionId);
                    cmd.Parameters.AddWithValue("@QuestionID5", questions[4].QuestionId);

                    SqlParameter outputIdParam = new SqlParameter("@QuizId", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(outputIdParam);

                    cmd.ExecuteNonQuery();

                    quizId = (int)outputIdParam.Value;
                }
            }

            return quizId;
        }

        public (Quiz quiz, UserScore userScore) GetDailyQuiz(string userEmail, int currentQuizId)
        {
            UserScore userScore = GetUserScore(userEmail, currentQuizId);

            Quiz dailyQuiz = GetQuizById(currentQuizId);

            if (dailyQuiz == null)
            {
                GenerateQuizzes(1);
                dailyQuiz = GetQuizById(currentQuizId);
            }

            else if (userScore != null)
            {
                Quiz existingQuiz = GetQuizById(userScore.QuizId);
                return (existingQuiz, userScore);
            }

            return (dailyQuiz, null);
        }

        private UserScore GetUserScore(string userEmail, int quizId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetUserScore", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;  
                    cmd.Parameters.AddWithValue("@userEmail", userEmail);  
                    cmd.Parameters.AddWithValue("@quizId", quizId); 

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new UserScore(
                                quizId: reader.GetInt32(0),
                                userMail: reader.GetString(1),
                                score: reader.GetInt32(2),
                                timeInSeconds: reader.GetInt32(3)
                            );
                        }
                    }
                }
            }
            return null;
        }

        private Quiz GetQuizById(int quizId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetQuizById", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@quiz_id", quizId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Question> questionsList = new List<Question>();

                        while (reader.Read())
                        {
                            Question question = new Question(
                                reader.GetInt32(0),     
                                reader.GetString(1),    
                                reader.GetString(2),    
                                reader.GetString(3),    
                                reader.GetString(4),    
                                reader.GetString(5)     
                            );

                            questionsList.Add(question);
                        }

                        if (questionsList.Count > 0)
                        {
                            return new Quiz(
                                quizId: quizId,
                                questions: questionsList.ToArray()  
                            );
                        }
                    }
                }
            }
            return null;
        }

        public void SaveUserScore(UserScore userScore)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_SaveUserScore", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@quizId", userScore.QuizId);
                    cmd.Parameters.AddWithValue("@userMail", userScore.UserMail);
                    cmd.Parameters.AddWithValue("@score", userScore.Score);
                    cmd.Parameters.AddWithValue("@TimeInSecond", userScore.TimeInSeconds);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
