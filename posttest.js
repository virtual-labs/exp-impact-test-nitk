
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
      question: "What is depth of the cyclindrical metal measure used in this experiment?",
      answers: {
        a: "45mm",
        b: "50mm",
        c: "55mm",
        d: "60mm"
      },
      correctAnswer: "a"
    },

    {
      question: "What is the use of Impact Test? ",
      answers: {
        a: "Resistance of an aggregates to loads",
        b: "Resistance of aggregates under loads",
        c: "Resistance of aggregates to sudden impact",
        d: "Resistance of aggregates to abrasion"
      },
      correctAnswer: "c"
    },

    {
      question: "What should be the Impact Value of aggregates used in concrete?",
      answers: {
        a: "Not less than 40%",
        b: "Not less than 45%",
        c: "More than 50%",
        d: "More than 55%"
      },
      correctAnswer: "b"
    },
    {
      question: "Which property of the material is used to resist Impact? ",
      answers: {
        a: "Strength",
        b: "Durability",
        c: "Toughness",
        d: "Abrasion"
      },
      correctAnswer: "c"
    },
    {
      question: "Aggregate can be said as strong, when the impact value is very less. (Say True or False)",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    }  
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
