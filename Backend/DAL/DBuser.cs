﻿using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Backend.BL;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@ProfileImage", profileImageLink);

                cmd.ExecuteNonQuery();
            }
        }


        public List<Dictionary<string, string>> GetAllUsernamesAndEmails(string excludeEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_getAllUsernamesAndEmails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ExcludeEmail", excludeEmail);

                List<Dictionary<string, string>> users = new List<Dictionary<string, string>>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var user = new Dictionary<string, string>
                {
                    { "Username", reader["username"].ToString() },
                    { "Email", reader["email"].ToString() },
                    { "profileImage", reader["profileImage"].ToString() }
                };
                        users.Add(user);
                    }
                }

                return users;
            }
        }

        public List<Users> GetAllUsers()
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetActiveUsers", con);
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

        public int AddFriend(string followerEmail, string followedAfterEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AddFriend", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FollowerEmail", followerEmail);
                cmd.Parameters.AddWithValue("@FollowedAfter", followedAfterEmail);

                SqlParameter returnValue = new SqlParameter();
                returnValue.Direction = ParameterDirection.ReturnValue;
                cmd.Parameters.Add(returnValue);

                cmd.ExecuteNonQuery();

                return (int)returnValue.Value;  // Return the result
            }
        }

        public int RemoveFriend(string followerEmail, string followedAfterEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_RemoveFriend", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FollowerEmail", followerEmail);
                cmd.Parameters.AddWithValue("@FollowedAfter", followedAfterEmail);

                SqlParameter returnValue = new SqlParameter();
                returnValue.Direction = ParameterDirection.ReturnValue;
                cmd.Parameters.Add(returnValue);

                cmd.ExecuteNonQuery();

                return (int)returnValue.Value;  // Return the result
            }
        }

        public bool CheckIfFriends(string followerEmail, string followedAfterEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_CheckIfFriends", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FollowerEmail", followerEmail);
                cmd.Parameters.AddWithValue("@FollowedAfterEmail", followedAfterEmail);

                SqlParameter returnValue = new SqlParameter();
                returnValue.Direction = ParameterDirection.ReturnValue;
                cmd.Parameters.Add(returnValue);

                cmd.ExecuteNonQuery();

                return (int)returnValue.Value == 1;  // Return true if they are friends
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


        public List<Users> GetUsersFollowing(string email)
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


        public void UpdateUserCoins(string userEmail, decimal coinsAmount)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_UpdateUserCoins", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserEmail", userEmail);
                cmd.Parameters.AddWithValue("@CoinsAmount", coinsAmount);

                cmd.ExecuteNonQuery();
            }
        }

        // Method to get the user's current coin balance
        public int GetUserCoins(string userEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetUserCoins", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserEmail", userEmail);

                object result = cmd.ExecuteScalar();
                return result != null ? Convert.ToInt32(result) : 0;
            }
        }

        public List<UserScore> GetTop5UserScores(int quizId)
        {
            List<UserScore> topScores = new List<UserScore>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetTop5UserScores", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@quizId", quizId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            UserScore userScore = new UserScore(
                                quizId: quizId,
                                userMail: reader.GetString(0),
                                score: reader.GetInt32(1),
                                timeInSeconds: reader.GetInt32(2),
                                username: reader.GetString(3)
                            );
                            topScores.Add(userScore);
                        }
                    }
                }
            }

            return topScores;
        }

        public void CreateNewUser(string username, string email, string password, int coins)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_createNewUser", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Username", username);
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Password", password);
                cmd.Parameters.AddWithValue("@Coins", coins);

                cmd.ExecuteNonQuery();
            }
        }

        public int GetTotalUsersCount()
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetTotalUsersCount", con);
                cmd.CommandType = CommandType.StoredProcedure;

                return (int)cmd.ExecuteScalar();
            }
        }

        public List<Dictionary<string, object>> GetAllUsersWithStats()
        {
            List<Dictionary<string, object>> users = new List<Dictionary<string, object>>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllUsersWithStats", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var user = new Dictionary<string, object>
                        {
                            { "email", reader["email"].ToString() },
                            { "username", reader["username"].ToString() },
                            { "coins", reader["coins"] != DBNull.Value ? (int)reader["coins"] : 0 },
                            { "purchasedBooksCount", reader["purchasedBooksCount"] != DBNull.Value ? (int)reader["purchasedBooksCount"] : 0 },
                            { "followingCount", reader["followingCount"] != DBNull.Value ? (int)reader["followingCount"] : 0 },
                            { "followersCount", reader["followersCount"] != DBNull.Value ? (int)reader["followersCount"] : 0 },
                            { "isActive", reader["isActive"] != DBNull.Value ? (bool)reader["isActive"] : false }
                        };
                        users.Add(user);
                    }
                }
            }

            return users;
        }

        public (string Username, string ProfileImageLink) GetUsernameAndProfileImageByEmail(string email)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetUsernameAndProfileImageByEmail", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", email);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string username = reader["username"].ToString();
                            string profileImageLink = reader["profileImage"] != DBNull.Value
                                                      ? reader["profileImage"].ToString()
                                                      : null;

                            return (username, profileImageLink);
                        }
                        else
                        {
                            return (null, null); // Return null tuple if no user is found
                        }
                    }
                }
            }
        }

        public List<object> GetAllUsersWithActiveProp()
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAllUsers", con);
                cmd.CommandType = CommandType.StoredProcedure;

                List<object> users = new List<object>();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var userWithActiveProp = new
                        {
                            Email = reader["email"].ToString(),
                            Username = reader["username"].ToString(),
                            Password = "",  
                            ProfileImageLink = reader["profileImage"].ToString(),
                            Coins = Convert.ToInt32(reader["coins"]),
                            IsActive = Convert.ToBoolean(reader["isActive"])  
                        };

                        users.Add(userWithActiveProp);
                    }
                }

                return users;
            }
        }

        public void MakeUserInactive(string email)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_MakeUserInactive", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Email", email));

                try
                {
                    cmd.ExecuteNonQuery();
                    Console.WriteLine($"User with email {email} has been made inactive.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occurred: " + ex.Message);
                }
            }
        }

        public void MakeUserActive(string email)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_MakeUserActive", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Email", email));

                try
                {
                    cmd.ExecuteNonQuery();
                    Console.WriteLine($"User with email {email} has been made active.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occurred: " + ex.Message);
                }
            }
        }

    }
}
