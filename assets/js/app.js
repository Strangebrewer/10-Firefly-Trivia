$(window).ready(function () {

  document.getElementById("start-btn").addEventListener("click", quiz.startQuiz);
  // $("#start-btn").on("click", quiz.startQuiz);
  // These are the same thing - vanilla js vs. jQuery

  $(".radio-btn").on("click", function () {
    if (buttonFlag) {
      buttonFlag = false;
      clearTimeout(quizTimeout);
      clearInterval(quizInterval);
      quiz.fadeOut(prevQuestion + "-answers");
      quiz.fadeIn(prevQuestion + "-reveal");
      showTimeout = setTimeout(quiz.showAnswer, 4000);
      if (this.value === "true") {
        quiz.fadeIn(prevQuestion + "-correct");
        correctAnswers++;
      } else if (this.value === "false") {
        quiz.fadeIn(prevQuestion + "-incorrect"); 
        incorrectAnswers++;
      }
    }
  });

  $("#start-over-btn").on("click", function () {
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    buttonFlag = true;
    qIdArray = ["#q1", "#q2", "#q3", "#q4", "#q5", "#q6", "#q7", "#q8", "#q9", "#q10", "#q11", "#q12", "#q13"];
    quiz.fadeOut("#stat-container");
    $(".hidden-start").css("display", "none");
    quiz.fadeIn("#quiz-container");
    quiz.nextQuestion();
    var radios = document.getElementsByClassName("radio-btn");
    for (i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  });

});

var qIdArray = ["#q1", "#q2", "#q3", "#q4", "#q5", "#q6", "#q7", "#q8", "#q9", "#q10", "#q11", "#q12", "#q13"];
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions;
var totalQuestions = 13;
var questionId;
var timeRemaining;
var quizTimeout;
var quizInterval;
var showTimeout;
var prevQuestion;
var buttonFlag = true;


// quiz object
var quiz = {

  startQuiz: function () {
    $("#start-btn").fadeOut();
    $("#quiz-container").fadeIn();
    quiz.nextQuestion();
  }

  // , fadeOut: function (p1) {
  //   $(p1).css("animation", "fadeout .2s");
  //   $(p1).css("opacity", "0");
  //   setTimeout(function () {
  //     $(p1).css("display", "none");
  //   }, 200);
  // }

  // , fadeIn: function (p1) {
  //   setTimeout(function () {
  //     $(p1).css("animation", "fadein 1s");
  //     $(p1).css("opacity", "1");
  //     $(p1).css("display", "block");
  //   }, 1000);
  // }

  , nextQuestion: function () {
    x = quiz.randomInt(0, qIdArray.length - 1);
    questionId = qIdArray[x];
    qIdArray.splice(x, 1)
    quiz.fadeIn("" + questionId);
    quiz.fadeIn("" + questionId + "-answers");
    quiz.fadeIn("#time-remaining");
    prevQuestion = ("" + questionId);
    questionId++;
    timeRemaining = 26;
    quizInterval = setInterval(quiz.count, 1000);
    buttonFlag = true;
    quizTimeout = setTimeout(quiz.countDown, 26001);
  }

  , count: function () {
    timeRemaining--;
    $("#time-count").html(timeRemaining);
  }

  , countDown: function () {
    buttonFlag = false;
    clearInterval(quizInterval);
    quiz.fadeOut(prevQuestion + "-answers");
    quiz.fadeIn(prevQuestion + "-times-up");
    quiz.fadeIn(prevQuestion + "-reveal");
    showTimeout = setTimeout(quiz.showAnswer, 4000);
  }

  , showAnswer: function () {
    if (qIdArray.length === 0) {
      clearTimeout(quizTimeout);
      clearInterval(quizInterval);
      quiz.fadeOut(prevQuestion + "-over");
      quiz.fadeOut(prevQuestion);
      quiz.fadeOut("#quiz-container");
      quiz.fadeIn("#stat-container");
      unansweredQuestions = totalQuestions - (correctAnswers + incorrectAnswers);
      $("#correct-answers").html("Correct Answers: " + correctAnswers);
      $("#incorrect-answers").html("Incorrect Answers: " + incorrectAnswers);
      $("#unanswered").html("Unanswered: " + unansweredQuestions);
    } else {
      quiz.fadeOut(prevQuestion + "-over");
      quiz.fadeOut(prevQuestion);
      quiz.nextQuestion();
    }
  }

  , randomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}