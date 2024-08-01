var count = 1;
var seconds = 0;
var interval;
var questions = [];
var arrAns = [];
var finalAnsForQues = ""; // Each time the user clicks next - the final answer will be saved to the array

$(document).ready(function () {
  const startButton = $("#btn-start-quiz");
  const nextQuestionButton = $("#next-question");

  startButton.on("click", startStopwatch);
  nextQuestionButton.on("click", nextQuestion);
});

// Get the quiz questions and answers
const fetchQuestions = () => {
  //   $.getJSON("path/to/your/questions.json", function (data) {
  //     questions = data;
  //     displayQuestion(0);
  //   });
  questions = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      wrongAnswer1: "London",
      wrongAnswer2: "Berlin",
      wrongAnswer3: "Madrid",
    },
    {
      question: "What is 2 + 2?",
      answer: "4",
      wrongAnswer1: "3",
      wrongAnswer2: "5",
      wrongAnswer3: "6",
    },
    {
      question: "What is the capital of Japan?",
      answer: "Tokyo",
      wrongAnswer1: "Beijing",
      wrongAnswer2: "Seoul",
      wrongAnswer3: "Bangkok",
    },
    {
      question: "What is the largest ocean?",
      answer: "Pacific",
      wrongAnswer1: "Atlantic",
      wrongAnswer2: "Indian",
      wrongAnswer3: "Arctic",
    },
    {
      question: "What is the square root of 16?",
      answer: "4",
      wrongAnswer1: "3",
      wrongAnswer2: "5",
      wrongAnswer3: "6",
    },
  ];
  displayQuestion(0);
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

  $("#question").text(questionData.question);

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
  $(".opening").addClass("none");
  $(".container-questions").removeClass("none");
  fetchQuestions();

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

  console.log(`Correct answers: ${corrects} out of ${questions.length}`);
  // לעשות לידבורד
};
