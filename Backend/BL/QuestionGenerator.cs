using Backend.BL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.BL
{
    public class QuestionGenerator
    {
        private List<Book> allBooks;
        private HashSet<string> existingQuestions; // To track already generated questions
        private int index = 0;

        public QuestionGenerator()
        {
            allBooks = Book.GetAllBooks();
            existingQuestions = new HashSet<string>();
        }

        public List<Question> GenerateQuestions(int numberOfQuestionsPerBook)
        {
            var questions = new List<Question>();

            foreach (var book in allBooks)
            {
                questions.AddRange(GenerateQuestionsForBook(book, numberOfQuestionsPerBook));
            }

            return questions;
        }

        private List<Question> GenerateQuestionsForBook(Book book, int numberOfQuestions)
        {
            var questions = new List<Question>();
            var templates = GetQuestionTemplates();
            int stop = index + numberOfQuestions;

            while (index < stop)
            {
                var template = templates[index % templates.Count];
                Question question = null;
                int attemptCount = 0;
                const int maxAttempts = 100;

                do
                {
                    if (attemptCount >= maxAttempts)
                    {
                        Console.WriteLine("Maximum attempts reached. Skipping question.");
                        break;
                    }

                    var (questionText, correctAnswer, wrongAnswers) = GenerateQuestionAndAnswers(template, book);

                    if (wrongAnswers.Count < 3)
                    {
                        // Skip this question generation and move to the next one
                        attemptCount++;
                        continue;
                    }

                    question = new Question(
                        questionId: 0,
                        questionText: questionText,
                        answer: correctAnswer,
                        wrongAnswer1: wrongAnswers.ElementAtOrDefault(0),
                        wrongAnswer2: wrongAnswers.ElementAtOrDefault(1),
                        wrongAnswer3: wrongAnswers.ElementAtOrDefault(2)
                    );

                    attemptCount++;
                } while (question != null && (existingQuestions.Contains(question.QuestionText) || !AreAnswersUnique(question)));

                if (question != null && attemptCount < maxAttempts)
                {
                    existingQuestions.Add(question.QuestionText);
                    questions.Add(question);
                }
                index++;
            }

            return questions;
        }


        private (string questionText, string correctAnswer, List<string> wrongAnswers) GenerateQuestionAndAnswers(string template, Book book)
        {
            string questionText = GenerateQuestionText(template, book);
            var (correctAnswer, wrongAnswers) = GenerateAnswers(questionText, book);

            return (questionText, correctAnswer, wrongAnswers); // Skip the correct answer in the wrong answers
        }

        private (string correctAnswer, List<string> wrongAnswers) GenerateAnswers(string template, Book book)
        {
            var possibleAnswers = Enumerable.Empty<string>();
            var wrongAnswers = new List<string>();
            string correctAnswer = string.Empty;

            // Exclude the current book to get answers from other books
            var otherBooks = allBooks.Where(b => b != book);

            if (template.Contains("title"))
            {
                correctAnswer = book.Title;
                possibleAnswers = otherBooks.Select(b => b.Title);
            }
            else if (template.Contains("description"))
            {
                correctAnswer = book.Title;
                possibleAnswers = otherBooks.Select(b => b.Title);
            }
            else if (template.Contains("author"))
            {
                correctAnswer = string.Join(", ", book.Authors.Select(a => a.Name));
                possibleAnswers = otherBooks.SelectMany(b => b.Authors.Select(a => a.Name));
            }
            else if (template.Contains("publisher"))
            {
                correctAnswer = book.Publisher;
                possibleAnswers = otherBooks.Select(b => b.Publisher);
            }
            else if (template.Contains("language"))
            {
                correctAnswer = book.Language;
                possibleAnswers = otherBooks.Select(b => b.Language);
            }
            else if (template.Contains("subtitle"))
            {
                correctAnswer = book.Subtitle;
                possibleAnswers = otherBooks.Select(b => b.Subtitle);
            }
            else if (template.Contains("pageCount"))
            {
                correctAnswer = book.PageCount.ToString();
                possibleAnswers = otherBooks.Select(b => b.PageCount.ToString());
            }
            else if (template.Contains("year"))
            {
                correctAnswer = book.PublishDate.ToShortDateString();
                possibleAnswers = otherBooks.Select(b => b.PublishDate.ToShortDateString());
            }
            else if (template.Contains("rating"))
            {
                correctAnswer = book.AvgRating.ToString();
                possibleAnswers = otherBooks.Select(b => b.AvgRating.ToString());
            }

            // Filter out the correct answer from possible answers
            possibleAnswers = possibleAnswers.Where(a => a != correctAnswer);


            // Shuffle and take the top 3 wrong answers
            wrongAnswers = possibleAnswers.OrderBy(x => Guid.NewGuid()).Take(3).ToList();


            return (correctAnswer, wrongAnswers);
        }

        private string GenerateQuestionText(string template, Book book)
        {
            return template
                .Replace("[title]", book.Title)
                .Replace("[description]", book.Description)
                .Replace("[publisher]", book.Publisher)
                .Replace("[language]", book.Language)
                .Replace("[subtitle]", book.Subtitle)
                .Replace("[pageCount]", book.PageCount.ToString())
                .Replace("[publishDate]", book.PublishDate.ToShortDateString());
        }

        private bool AreAnswersUnique(Question question)
        {
            var answers = new HashSet<string>
            {
                question.Answer,
                question.WrongAnswer1,
                question.WrongAnswer2,
                question.WrongAnswer3
            };

            return answers.Count == 4; // 4 unique answers (1 correct + 3 wrong)
        }

        private List<string> GetQuestionTemplates()
        {
            return new List<string>
            {
                "What is the title of the book described by the following description: [description]?",
                "Who is the author of the book [title]?",
                "In which year and month was the book [title] published?",
                "What is the publisher of the book [title]?",
                "Which book has the following description: [description]?",
                "What language is the book [title] written in?",
                "What is the average rating of the book [title]?",
                "Which book is described as follows: [description]?",
                "Who wrote the book [title]?",
                "Which book is published by [publisher]?",
                "What is the subtitle of the book [title]?",
                "What is the page count of the book [title]?",
                "Which book includes the following subtitle: [subtitle]?",
                "Who are the authors of the book [title]?",
                "What is the maturity rating of the book [title]?",
                "In which language is the book [title] written?",
                "Which book was published by [publisher] and has a description of [description]?",
                "What are the categories of the book [title]?",
                "Which book was released on [publishDate]?"
            };
        }
    }
}
