var count = 1;
var seconds = 0;
var interval;
var questions = [];
var arrAns = [];
var finalAnsForQues = ""; // Each time the user clicks next - the final answer will be saved to the array
var topUsers = [];
var quizId;

$(document).ready(function () {
  const startButton = $("#btn-start-quiz");
  const nextQuestionButton = $("#next-question");

  startButton.on("click", startStopwatch);
  nextQuestionButton.on("click", nextQuestion);
});

// Get the quiz questions and answers
const fetchQuestions = () => {
  fetchData(
    API_URL +
      "Quiz/daily-quiz/" +
      encodeURIComponent(localStorage.getItem("email")),
    displayQuestions,
    onError
  );
};

const displayQuestions = (data) => {
  console.log(data);
  if (data.message === "You have already taken today's quiz.") {
    // If the user has already taken the quiz, show the last page with their results
    showLastPageQuiz(-1, data);
  } else if (data.message === "Here is your daily quiz.") {
    // If this is a new quiz, display the questions
    quizId = data.quiz.quizId;
    console.log(data.quiz.quizId);
    questions = data.quiz.questions;
    console.log(questions);
    displayQuestion(0);
  } else {
    console.error("Unexpected response from server:", data);
    alert("There was an error retrieving your quiz. Please try again later.");
  }
};

// Shuffle the answers of each question
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Display the question and answers on the screen
const displayQuestion = (index) => {
  const questionData = questions[index];
  const answers = shuffleArray([
    { text: questionData.answer, isCorrect: true },
    { text: questionData.wrongAnswer1, isCorrect: false },
    { text: questionData.wrongAnswer2, isCorrect: false },
    { text: questionData.wrongAnswer3, isCorrect: false },
  ]);

  $("#question").text(questionData.questionText);

  $(".ans").each(function (i) {
    $(this).removeClass("selected");
    $(this).find("p").text(answers[i].text);
    $(this).data("isCorrect", answers[i].isCorrect);
  });

  $(".ans").each(function () {
    $(this)
      .off("click")
      .on("click", function () {
        $(".ans").removeClass("selected"); // Remove 'selected' class from all '.ans' elements
        $(this).addClass("selected");
        finalAnsForQues = $(this).find("p").text();

        // Enable the next question button
        $("#next-question").removeClass("disabled");
      });
  });
};

// Start the timer when the quiz starts
const startStopwatch = () => {
  fetchQuestions();
  $(".opening").addClass("none");
  $(".container-questions").removeClass("none");

  const timeDisplay = $(".time");
  if (interval) {
    clearInterval(interval);
  }
  seconds = 0;
  timeDisplay.text(formatTime(seconds));
  interval = setInterval(() => {
    seconds++;
    timeDisplay.text(formatTime(seconds));
  }, 1000);
};

// Format the timer to 00:00
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// btn next question was clicked
const nextQuestion = () => {
  if ($(".ans.selected").length === 0) {
    alert("Please select an answer before proceeding.");
    return;
  }

  arrAns.push(finalAnsForQues);

  if (count < questions.length) {
    count++;
    displayQuestion(count - 1);
    $(".count").html(count);
    $("#next-question").addClass("disabled");

    if (count === questions.length) {
      $("#next-question").text("Finish");
    }
  } else {
    // Quiz finished
    clearInterval(interval);
    finishQuiz();
  }
};

// check how many questions was correct, and show the lead board
const finishQuiz = () => {
  let corrects = 0;

  arrAns.forEach((selectedAnswer, index) => {
    if (selectedAnswer === questions[index].answer) {
      corrects++;
    }
  });

  // send resaults to server
  sendResultsToServer(corrects, seconds);
  showLastPageQuiz(corrects);
};

const showLastPageQuiz = (corrects = -1, data = null) => {
  if (corrects === -1) {
    $("#add-coins").text(data.quiz.score * 3);
    $(".bg-scores .count").text(data.score);
    $("#total-time > span").text(formatTime(data.timeInSeconds));
  } else {
    // display resualts
    $("#add-coins").text(corrects * 3);
    $(".bg-scores .count").text(corrects);
    $("#total-time > span").text($(".time")[0].outerText);
  }

  $(".final").removeClass("none");
  $(".container-questions").addClass("none");
  getTopUsers();
};

// send resaults of quiz to server
const sendResultsToServer = (score, time) => {
  let data = {
    quizId: quizId,
    userMail: localStorage.getItem("email"),
    score: score,
    timeInSeconds: time,
    username: localStorage.getItem("authToken"),
  };

  //update coins
  let coins = parseInt(localStorage.getItem("coins")) + score * 3;
  localStorage.setItem("coins", coins);
  $("#add-coins").text("" + score * 3);
  $(".navbar-desktop #coins").text(coins + "coins");

  sendData(API_URL + "Quiz/save-score", data, getTopUsers, onError);
};

const getTopUsers = () => {
  fetchData(
    API_URL + "Users/daily-quiz/top-5-users-scores",
    renderTopUsers,
    onError
  );
};

const renderTopUsers = (data) => {
  console.log(data);
  topUsers = data;
  $("#usernames-lead").empty();

  let index = 1;
  while (index <= topUsers.length) {
    const user = `
        <div class="input-box-sqr flex center-hor gap-1">
            <div class="circle-gradient md-text">${index}</div>
            <p class="username">${
              topUsers[index - 1].username
            }</p> <!-- Username -->
            <div class="score flex center-hor">${
              topUsers[index - 1].score
            }/5</div> <!-- Score -->
            <div class="total-time">${formatTime(
              topUsers[index - 1].timeInSeconds
            )}</div> <!-- Time -->
        </div>`;
    $("#usernames-lead").append(user);
    index++;
  }
};
