namespace Backend.BL
{
    public class Review
    {
        private int reviewNum;
        private string title;
        private string reviewText;
        private string email;
        private int rating;
        private bool finishedReading;

        public Review(int reviewNum, string title, string reviewText, string email, int rating, bool finishedReading)
        {
            ReviewNum = reviewNum;
            Title = title;
            ReviewText = reviewText;
            Email = email;
            Rating = rating;
            FinishedReading = finishedReading;
        }

        public int ReviewNum { get => reviewNum; set => reviewNum = value; }
        public string Title { get => title; set => title = value; }
        public string ReviewText { get => reviewText; set => reviewText = value; }
        public string Email { get => email; set => email = value; }
        public int Rating { get => rating; set => rating = value; }
        public bool FinishedReading { get => finishedReading; set => finishedReading = value; }
    }
}
