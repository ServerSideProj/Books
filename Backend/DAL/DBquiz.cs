using Backend.BL;
using System.Data.SqlClient;
using System.Data;

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
    }
}
