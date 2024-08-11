namespace Backend.BL
{
    public class Review
    {
        private int reviewNum;
        private int bookId;
        private string reviewText;
        private string email;
        private int rating;
        private bool finishedReading;
        private string username;  
        private string profileImage;

        public Review(int reviewNum, int bookId, string reviewText, string email, int rating, bool finishedReading, string username, string profileImage)
        {
            ReviewNum = reviewNum;
            BookId = bookId;
            ReviewText = reviewText;
            Email = email;
            Rating = rating;
            FinishedReading = finishedReading;
            Username = username;
            ProfileImage = profileImage;
        }


        public int ReviewNum { get => reviewNum; set => reviewNum = value; }
        public int BookId { get => bookId; set => bookId = value; }
        public string ReviewText { get => reviewText; set => reviewText = value; }
        public string Email { get => email; set => email = value; }
        public int Rating { get => rating; set => rating = value; }
        public bool FinishedReading { get => finishedReading; set => finishedReading = value; }
        public string Username { get => username; set => username = value; }       
        public string ProfileImage { get => profileImage; set => profileImage = value; } 
    }
}
