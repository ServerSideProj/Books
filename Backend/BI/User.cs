namespace Backend.BI
{
    public class User
    {
        private string email;
        private string username;
        private string password;
        private string profileImageLink;

        public User(string email, string username, string password, string profileImageLink)
        {
            Email = email;
            Username = username;
            Password = password;
            ProfileImageLink = profileImageLink;
        }

        public string Email { get => email; set => email = value; }
        public string Username { get => username; set => username = value; }
        public string Password { get => password; set => password = value; }
        public string ProfileImageLink { get => profileImageLink; set => profileImageLink = value; }

    }
}
