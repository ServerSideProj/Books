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
    }
}
