$(window).ready(function () {

  $("#start-btn").on("click", quiz.startQuiz);

  $(".quiz-btn").on("click", function () {
    if (buttonFlag) {
      buttonFlag = false;
      clearTimeout(quizTimeout);
      clearInterval(quizInterval);
      $("#answers").fadeOut();
      $("#reveal").html("The correct answer is: " + questions[questionIndex].answer);
      showTimeout = setTimeout(quiz.showAnswer, 3000);
      if ($(this).attr("value") === "true") {
        setTimeout(function () {
          $("#correct-incorrect").html("Right!");
          $("#question-expire").fadeIn(1000);
          correctAnswers++;
        }, 400);
      } else if ($(this).attr("value") === "false") {
        setTimeout(function () {
          $("#correct-incorrect").html("Wrong!");
          $("#question-expire").fadeIn(1000);
          incorrectAnswers++;
        }, 400);

      }
    }
  });

  $("#start-over-btn").on("click", function () {
    if (startOverButtonFlag === true) {
      startOverButtonFlag = false;
      correctAnswers = 0;
      incorrectAnswers = 0;
      unansweredQuestions = 0;
      buttonFlag = true;
      startButtonFlag = true;
      usedQuestions.length = 0;
      $("#stat-container").fadeOut();
      setTimeout(function () {
        $(".hidden-start").css("display", "none");
      }, 400);
      quiz.nextQuestion();
    }
  });

});

var questions = [
  {
    question: "Who is the captain of Serenity?"
    , btnOne: "Glen Sutherland"
    , btnTwo: "Malcolm Reynolds"
    , btnThree: "Strongbad"
    , btnFour: "Brother Stimpy"
    , answerIndex: "1"
    , answer: "Malcolm Reynolds"
  }
  , {
    question: "What is the name of the ultra-violent cannibals who were driven insane by unknown causes?"
    , btnOne: "The Alliance"
    , btnTwo: "Krokans"
    , btnThree: "Independents"
    , btnFour: "Reavers"
    , answerIndex: "3"
    , answer: "Reavers"
  }
  , {
    question: "English is not the only language spoken in the Firefly universe. Terms from what other language are frequently used?"
    , btnOne: "Arabic"
    , btnTwo: "Spanish"
    , btnThree: "Pig Latin"
    , btnFour: "Chinese"
    , answerIndex: "3"
    , answer: "Chinese"
  }
  , {
    question: "What personal item belonging to Shepherd Book does River Tam attempt to fix?"
    , btnOne: "His Bible"
    , btnTwo: "His camera"
    , btnThree: "His ID card"
    , btnFour: "His collar"
    , answerIndex: "0"
    , answer: "His Bible"
  }
  , {
    question: "How long after The Battle of Serenity Valley does the series take place?"
    , btnOne: "one month"
    , btnTwo: "two years"
    , btnThree: "20 years"
    , btnFour: "six years"
    , answerIndex: "3"
    , answer: "six years"
  }
  , {
    question: "In the Firefly film, Serenity, who helps the crew figure out who is chasing them?"
    , btnOne: "Mr. Universe"
    , btnTwo: "The Jackal"
    , btnThree: "Overton"
    , btnFour: "Frank Black"
    , answerIndex: "0"
    , answer: "Mr. Universe"
  }
  , {
    question: "What planet did the Alliance try to keep hidden?"
    , btnOne: "Pluto"
    , btnTwo: "Beaumonde"
    , btnThree: "Miranda"
    , btnFour: "Ariadne"
    , answerIndex: "2"
    , answer: "Miranda"
  }
  , {
    question: "How did River describe the government agents who were chasing her?"
    , btnOne: "Men in Black"
    , btnTwo: "Two-by-two, hands of blue"
    , btnThree: "The Operatives"
    , btnFour: "The Elder Tribunal"
    , answerIndex: "1"
    , answer: "Two-by-two, hands of blue"
  }
  , {
    question: "What did the independents who fought for freedom call themselves?"
    , btnOne: "The Revolution"
    , btnTwo: "Freedom Brigade"
    , btnThree: "La Resistance"
    , btnFour: "Browncoats"
    , answerIndex: "3"
    , answer: "Browncoats"
  }
  , {
    question: "What was Simon Tam's secret cargo?"
    , btnOne: "Stolen produce"
    , btnTwo: "Gold"
    , btnThree: "His sister"
    , btnFour: "Medical supplies"
    , answerIndex: "2"
    , answer: "His sister"
  }
  , {
    question: "What was Wash's catch phrase?"
    , btnOne: "Any last words?"
    , btnTwo: "Let's see where this goes"
    , btnThree: "Don't make me use this"
    , btnFour: "I am a leaf on the wind"
    , answerIndex: "3"
    , answer: "I am a leaf on the wind"
  }
  , {
    question: "The Operative who is chasing after them to capture River says he is trying to create what?"
    , btnOne: "Peace"
    , btnTwo: "A world without sin"
    , btnThree: "Justice in the empire"
    , btnFour: "The best possible world"
    , answerIndex: "1"
    , answer: "A world without sin"
  }
  , {
    question: "Right before the film's climax, Captain Mal uttered one of the film's most famous lines:"
    , btnOne: "As you wish"
    , btnTwo: "I am Jack's smirking revenge"
    , btnThree: "I aim to misbehave"
    , btnFour: "E Pluribus Unum"
    , answerIndex: "2"
    , answer: "I aim to misbehave"
  }
]

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions;
var totalQuestions = 13;
var questionIndex;
var usedQuestions = [];
var timeRemaining;
var quizTimeout;
var quizInterval;
var showTimeout;
var buttonFlag = true;
var startButtonFlag = true;
var startOverButtonFlag = true;



var quiz = {

  startQuiz: function () {
    if (startButtonFlag === true) {
      startButtonFlag = false;
      $("#start-btn").fadeOut();
      quiz.nextQuestion();
    }
  }

  , setQuestionIndex: function () {
    questionIndex = Math.floor(Math.random() * questions.length);
  }

  , checkQuestionIndex: function () {
    if (usedQuestions.includes(questionIndex)) {
      quiz.setQuestionIndex();
      quiz.checkQuestionIndex();
    } else {
      usedQuestions.push(questionIndex);
    }
  }

  , setValue: function () {
    var buttons = document.getElementsByClassName("quiz-btn");
    var rightAnswer = parseInt(questions[questionIndex].answerIndex);
    for (i = 0; i < buttons.length; i++) {
      if (i === rightAnswer) {
        $(buttons[i]).attr("value", "true");
      }
      else {
        $(buttons[i]).attr("value", "false");
      }

    }
  }

  , setQuestion: function () {
    $("#question").html(questions[questionIndex].question);
    $("#btn-one").html(questions[questionIndex].btnOne);
    $("#btn-two").html(questions[questionIndex].btnTwo);
    $("#btn-three").html(questions[questionIndex].btnThree);
    $("#btn-four").html(questions[questionIndex].btnFour);
    $("#time-remaining").html("Time Remaining:&nbsp;<span id='time-count'></span>&nbsp;seconds");
    $("#time-count").html(timeRemaining);
  }

  , nextQuestion: function () {
    quiz.setQuestionIndex();
    quiz.checkQuestionIndex();
    quiz.setValue();
    timeRemaining = 16;
    quizInterval = setInterval(quiz.count, 1000);
    buttonFlag = true;
    quizTimeout = setTimeout(quiz.countDown, 16001);
    setTimeout(function () {
      quiz.setQuestion();
      $("#quiz-container").fadeIn(1001);
      $("#answers").fadeIn(401);
      $("#time-remaining").fadeIn(1001);
    }, 1000);
  }

  , count: function () {
    timeRemaining--;
    $("#time-count").html(timeRemaining);
  }

  , countDown: function () {
    buttonFlag = false;
    clearInterval(quizInterval);
    $("#answers").fadeOut();
    showTimeout = setTimeout(quiz.showAnswer, 3000);
    setTimeout(function () {
      $("#correct-incorrect").html("Time's Up!");
      $("#reveal").html("The correct answer is: " + questions[questionIndex].answer);
      $("#question-expire").fadeIn(1000);
    }, 400);
  }

  , showAnswer: function () {
    if (questions.length === usedQuestions.length) {
      startOverButtonFlag = true;
      $("#question-expire").fadeOut();
      $("#quiz-container").fadeOut();
      unansweredQuestions = totalQuestions - (correctAnswers + incorrectAnswers);
      setTimeout(function () {
        $("#correct-answers").html("Correct Answers: " + correctAnswers);
        $("#incorrect-answers").html("Incorrect Answers: " + incorrectAnswers);
        $("#unanswered").html("Unanswered: " + unansweredQuestions);
        $("#stat-container").fadeIn(1000);
      }, 400);
    }
    else {
      $("#question-expire").fadeOut();
      $("#quiz-container").fadeOut();
      quiz.nextQuestion();
    }
  }

};