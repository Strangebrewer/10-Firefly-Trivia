$(window).ready(function () {

  document.getElementById("start-btn").addEventListener("click", quiz.startQuiz);

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

// maybe run a for loop through the inputs each time to change the value to true or false depending on which one is the correct answer...

// Move the below into the app.js scriptvar correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions;
var totalQuestions = 13;
var questionIndex;
var usedQuestions = [];
var rightAnswer;
// maybe variables
var questionId;
var timeRemaining;
var quizTimeout;
var quizInterval;
var showTimeout;
var prevQuestion;
var buttonFlag = true;

var quiz = {

  // first, a button click to load the question & answers
  //  then run setQuestionIndex and setValue
  //  then a fade in

  setQuestionIndex: function () {
    questionIndex = Math.floor(Math.random() * questions.length);
    if (usedQuestions.includes(questionIndex)) {
      quiz.setQuestionIndex();
    } else {
      usedQuestions.push(questionIndex);
    }
  }

  , setValue: function () {
    var buttons = document.getElementsByClassName("quiz-btn");
    rightAnswer = parseInt(questions[questionIndex].answerIndex);
    for (i = 0; i < buttons.length; i++) {
      if (i === rightAnswer) {
        $(buttons[i]).attr("value", "true");
        console.log(i);
        console.log($(buttons[i]).attr("value"));
      }
      else {
        $(buttons[i]).attr("value", "false");
        console.log($(buttons[i]).attr("value"));
      }

    }
  }

  , startQuiz: function () {
    $("#start-btn").fadeOut(1000);
    quiz.nextQuestion();
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
    usedQuestions.push(questionIndex);
    quiz.setValue();
    timeRemaining = 26;
    quizInterval = setInterval(quiz.count, 1000);
    quizTimeout = setTimeout(quiz.countDown, 26001);
    setTimeout(function () {
      quiz.setQuestion();
      $("#quiz-container").fadeIn(1001);
      $("#time-remaining").fadeIn(2001);
    }, 1000);
  }

  , countDown: function () {
    buttonFlag = false;
    clearInterval(quizInterval);
    $("#answers").fadeOut();
    setTimeout(function () {
      $("#times-up").html("Time's Up!");
      $("#reveal").html("The correct answer is: " + questions[questionIndex].answer);
      $("#question-expire").fadeIn(1000);
    }, 1000);

    // quiz.fadeOut(prevQuestion + "-answers");
    // quiz.fadeIn(prevQuestion + "-times-up");
    // quiz.fadeIn(prevQuestion + "-reveal");
    // showTimeout = setTimeout(quiz.showAnswer, 4000);
  }

  , count: function () {
    timeRemaining--;
    $("#time-count").html(timeRemaining);
  }

}