using Backend.DAL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.BL
{
    public class Users
    {
        private string email;
        private string username;
        private string password;
        private string profileImageLink;
        private int coins;

        private static readonly DBuser dbUser = new DBuser();

        public Users(string email, string username, string password, string profileImageLink, int coins = 0)
        {
            Email = email;
            Username = username;
            Password = password;
            ProfileImageLink = profileImageLink;
            Coins = coins;
        }

        public string Email { get => email; set => email = value; }
        public string Username { get => username; set => username = value; }
        public string Password { get => password; set => password = value; }
        public string ProfileImageLink { get => profileImageLink; set => profileImageLink = value; }
        public int Coins { get => coins; set => coins = value; }

        public string Register()
        {
            return dbUser.RegisterUser(this);
        }

        public static Users Login(string email, string password)
        {
            return dbUser.LoginUser(email, password);
        }

        public static void UpdateProfileImage(string email, string profileImageLink)
        {
            dbUser.UpdateUserProfileImage(email, profileImageLink);
        }

        public static List<Dictionary<string, string>> GetAllUsernamesAndEmails(string excludeEmail)
        {
            return dbUser.GetAllUsernamesAndEmails(excludeEmail);
        }

        public static List<Users> GetAllUsers()
        {
            return dbUser.GetAllUsers();
        }

        public static List<Users> GetFollowers(string email)
        {
            return dbUser.GetFollowers(email);
        }

        public static List<Users> GetUsersFollowing(string email)
        {
            return dbUser.GetUsersFollowing(email);
        }

        public static int AddFriend(string followerEmail, string followedAfterEmail)
        {
            return dbUser.AddFriend(followerEmail, followedAfterEmail);
        }

        public static int RemoveFriend(string followerEmail, string followedAfterEmail)
        {
            return dbUser.RemoveFriend(followerEmail, followedAfterEmail);
        }

        public static bool CheckIfFriends(string followerEmail, string followedAfterEmail)
        {
            return dbUser.CheckIfFriends(followerEmail, followedAfterEmail);
        }

        public static int ChangePassword(string email, string oldPassword, string newPassword)
        {
            return dbUser.ChangePassword(email, oldPassword, newPassword);
        }

        public static List<UserScore> GetTop5UserScores()
        {
            Quiz.GetCurrentQuizId();
            return dbUser.GetTop5UserScores(Quiz.CurrentQuizId);
        }

        public static void CreateNewUser(string username, string email, string password, int coins)
        {
            dbUser.CreateNewUser(username, email, password, coins);
        }

        public static int GetTotalUsersCount()
        {
            return dbUser.GetTotalUsersCount();
        }

        public static List<Dictionary<string, object>> GetAllUsersWithStats()
        {
            return dbUser.GetAllUsersWithStats();
        }

        public static (string Username, string ProfileImageLink) GetUsernameAndProfileImageByEmail(string email)
        {
            return dbUser.GetUsernameAndProfileImageByEmail(email);
        }


        public static void MakeUserActive(string email)
        {
            dbUser.MakeUserActive(email);
        }

        public static void MakeUserInactive(string email)
        {
            dbUser.MakeUserInactive(email);
        }

        public static List<object> GetAllUsersWithActiveProp()
        {
            return dbUser.GetAllUsersWithActiveProp();
        }



    }
}
