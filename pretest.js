
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "Which of the following test measures the toughness of road aggregates?",
    answers: {
      a: "Impact test",
      b: "Abrasion test",
      c: "Crushing test",
      d: "Shape test"
    },
    correctAnswer: "a"
  },

  {
    question: "Set of sieves used in this experiment is?",
    answers: {

      a: "12.5mm, 20mm, 10mm",
      b: "12.5mm, 10mm, 2.5mm",
      c: "10mm, 12mm, 12.5mm",
      d: "2.5mm, 4.75mm, 10mm"
    },
    correctAnswer: "b"
  },

  {
    question: "What is diameter of cyclinder metal measure used in this experiment?",
    answers: {
      a: "75mm",
      b: "65mm",
      c: "45mm",
      d: "60mm"
    },
    correctAnswer: "c"
  },
  {
    question: "Impact value of aggregate satisfactory for road surfacing is",
    answers: {
      a: "&lt;10%",
      b: "20-30%",
      c: "30-40%",
      d: "&gt;50%"
    },
    correctAnswer: "b"
  },
  {
    question: "Aggregate impact value of less than 45% is suitable for",
    answers: {
      a: "Bitumen Bound Macadam Base Course",
      b: "WBM Base Course",
      c: "Concrete Base Course",
      d: "None of the above"
    },
    correctAnswer: "c"
  }
];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
