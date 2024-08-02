using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Backend.BI;

namespace Backend.DAL
{
    public class DBuser : DBservices
    {
        public string RegisterUser(Users user)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_registration", con);
                cmd.CommandType = CommandType.StoredProcedure;

                AddUserParameters(cmd, user);
                AddOutputParameter(cmd, "@Result", SqlDbType.Int);

                cmd.ExecuteNonQuery();
                int result = (int)cmd.Parameters["@Result"].Value;

                if (result == 1)
                {
                    return "Registration successful.";
                }
                else if (result == -1)
                {
                    return "Email already exists.";
                }
                else
                {
                    return "Unknown error occurred.";
                }
            }
        }

        public Users LoginUser(string email, string password)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_login", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Password", password);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Users(
                            email: reader["email"].ToString(),
                            username: reader["username"].ToString(),
                            password: password,  
                            profileImageLink: reader["profileImage"].ToString(),
                            coins: Convert.ToInt32(reader["coins"])
                        );
                    }
                    else
                    {
                        return null;  // Invalid login
                    }
                }
            }
        }

        public void UpdateUserProfileImage(string email, string profileImageLink)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateUserProfileImage", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@ProfileImage", profileImageLink);

                cmd.ExecuteNonQuery();
            }
        }

        public List<string> GetAllUsernames()
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_getAllUsernames", con);
                cmd.CommandType = CommandType.StoredProcedure;

                List<string> usernames = new List<string>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usernames.Add(reader["username"].ToString());
                    }
                }

                return usernames;
            }
        }

        public List<Users> GetAllUsers()
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllUsers", con);
                cmd.CommandType = CommandType.StoredProcedure;

                List<Users> users = new List<Users>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        users.Add(new Users(
                            email: reader["email"].ToString(),
                            username: reader["username"].ToString(),
                            password: "",  // Password is returned for security reasons
                            profileImageLink: reader["profileImage"].ToString(),
                            coins: Convert.ToInt32(reader["coins"])
                        ));
                    }
                }

                return users;
            }
        }

        private void AddUserParameters(SqlCommand cmd, Users user)
        {
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Username", user.Username);
            cmd.Parameters.AddWithValue("@Password", user.Password);
            cmd.Parameters.AddWithValue("@ProfileImage", (object)user.ProfileImageLink ?? DBNull.Value);
        }

        private void AddProfileImageParameter(SqlCommand cmd, Users user)
        {
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@ProfileImage", user.ProfileImageLink);
        }

        private void AddOutputParameter(SqlCommand cmd, string parameterName, SqlDbType dbType)
        {
            SqlParameter outputParam = new SqlParameter(parameterName, dbType);
            outputParam.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outputParam);
        }


        public List<Users> GetFollowers(string email)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetFollowers", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserEmail", email);

                List<Users> followers = new List<Users>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        followers.Add(new Users(
                            email: reader["email"].ToString(),
                            username: reader["username"].ToString(),
                            password: null, // Password is not returned
                            profileImageLink: reader["profileImage"].ToString(),
                            coins: Convert.ToInt32(reader["coins"])
                        ));
                    }
                }

                return followers;
            }
        }

        public int AddFriend(string followerEmail, string followingEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AddFriend", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FollowerEmail", followerEmail);
                cmd.Parameters.AddWithValue("@FollowingEmail", followingEmail);

                SqlParameter returnValue = new SqlParameter();
                returnValue.Direction = ParameterDirection.ReturnValue;
                cmd.Parameters.Add(returnValue);

                cmd.ExecuteNonQuery();

                return (int)returnValue.Value;  // Return the result
            }
        }

        public int ChangePassword(string email, string oldPassword, string newPassword)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_ChangePassword", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@OldPassword", oldPassword);
                cmd.Parameters.AddWithValue("@NewPassword", newPassword);

                SqlParameter returnValue = new SqlParameter();
                returnValue.Direction = ParameterDirection.ReturnValue;
                cmd.Parameters.Add(returnValue);

                cmd.ExecuteNonQuery();

                return (int)returnValue.Value;  // Return the result
            }
        }


        public List<Users> GetUsersFollowedBy(string email)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetFollowedUsers", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserEmail", email);

                List<Users> followedUsers = new List<Users>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        followedUsers.Add(new Users(
                            email: reader["email"].ToString(),
                            username: reader["username"].ToString(),
                            password: null, // Password is not returned
                            profileImageLink: reader["profileImage"].ToString(),
                            coins: Convert.ToInt32(reader["coins"])
                        ));
                    }
                }

                return followedUsers;
            }
        }
    }
}
