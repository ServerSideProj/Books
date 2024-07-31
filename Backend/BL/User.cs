namespace Backend.BI
{
    public class User
    {
        private string email;
        private string username;
        private string password;
        private string profileImageLink;
        private int coins;

        public User(string email, string username, string password, string profileImageLink, int coins = 0)
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
    }

}
