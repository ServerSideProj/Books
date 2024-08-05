using Backend.DAL;
using System.Collections.Generic;

namespace Backend.BI
{
    public class Users
    {
        private string email;
        private string username;
        private string password;
        private string profileImageLink;
        private int coins;

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
            DBuser dbUser = new DBuser();
            return dbUser.RegisterUser(this);
        }

        public static Users Login(string email, string password)
        {
            DBuser dbUser = new DBuser();
            return dbUser.LoginUser(email, password);
        }


        public static void UpdateProfileImage(string email, string profileImageLink)
        {
            DBuser dbUser = new DBuser();
            dbUser.UpdateUserProfileImage(email, profileImageLink);
        }

        public static List<string> GetAllUsernames()
        {
            DBuser dbUser = new DBuser();
            return dbUser.GetAllUsernames();
        }

        public static List<Users> GetAllUsers()
        {
            DBuser dbUser = new DBuser();
            return dbUser.GetAllUsers();
        }

        public static List<Users> GetFollowers(string email)
        {
            DBuser dbUser = new DBuser();
            return dbUser.GetFollowers(email);
        }

        public static List<Users> GetUsersFollowedBy(string email)
        {
            DBuser dbUser = new DBuser();
            return dbUser.GetUsersFollowedBy(email);
        }

        public static int AddFriend(string followerEmail, string followingEmail)
        {
            DBuser dbUser = new DBuser();
            return dbUser.AddFriend(followerEmail, followingEmail);
        }

        public static int ChangePassword(string email, string oldPassword, string newPassword)
        {
            DBuser dbUser = new DBuser();
            return dbUser.ChangePassword(email, oldPassword, newPassword);
        }

        public static void DeleteUser(string email)
        {
            DBuser dbUser = new DBuser();
            dbUser.DeleteUser(email);
        }
    }
}
