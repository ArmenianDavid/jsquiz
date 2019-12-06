const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-button");
const previousQuestionButton = document.getElementById("previous");
const nextQuestionButton = document.getElementById("next");
const resultContainer = document.getElementById("result-container");
let currentSlide = 0;
const data = [
  {
    question: `Is this function pure?
                const add = (x, y) => x + y;
                add(2, 4);`,
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "a"
  },
  {
    question: `What you can say about this function? let x = 2;
                  const add = (y) => {
                    x += y;
                  };
                  add(4);`,
    answers: {
      a: "it is pure",
      b: "it is inpure",
      c: "it is pure because it is returning anything"
    },
    correctAnswer: "b"
  },
  {
    question: `is this function pure? const add = (x, y) => {
                return  x + y
                };
                add(2, 4);`,
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "a"
  },
  {
    question: `How many arrguments recieves Arrays reduce method and is it pure?`,
    answers: {
      a: "3 & Yes",
      b: "4 & No",
      c: "4 & Yes"
    },
    correctAnswer: "c"
  },
  {
    question: `Which of Array methods do not return a new array`,
    answers: {
      a: "map,filter,reduce,every",
      b: "every,some,reduce,forEach",
      c: "every,some,forEach"
    },
    correctAnswer: "c"
  },
  {
    question: `How many data types have JS`,
    answers: {
      a: "6",
      b: "7",
      c: "8",
      d: "9"
    },
    correctAnswer: "c"
  },
  {
    question: `How many data types have JS`,
    answers: {
      a: "6",
      b: "7",
      c: "8",
      d: "9"
    },
    correctAnswer: "c"
  }
];

const buildQuiz = () => {
  const htmlOutput = [];
  data.forEach((everyQuestion, questionNumber) => {
    const answers = [];
    for (key in everyQuestion.answers) {
      answers.push(
        `<lable>
             <input type='radio' name="question${questionNumber}" value="${key}"/>
             ${key} : ${everyQuestion.answers[key]}
           </lable>`
      );
    }
    htmlOutput.push(
      `<div class='slide'>
            <div class='question'>${everyQuestion.question}</div>
            <div class='answers'>${answers.join("")}</div>
          </div>`
    );
  });
  quizContainer.innerHTML = htmlOutput.join("");
};
buildQuiz();

const showResults = () => {
  const answersContainers = document.querySelectorAll(".answers");
  let points = 0;

  data.forEach((everyQuestion, questionNumber) => {
    const answerContainer = answersContainers[questionNumber];
    const selector = "input[name=question" + questionNumber + "]:checked";
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    console.log(userAnswer);
    if (userAnswer === everyQuestion.correctAnswer) {
      points++;
      answersContainers[questionNumber].style.color = "green";
    } else {
      answersContainers[questionNumber].style.color = "red";
    }
  });
  resultContainer.innerHTML = points + " of " + data.length;
};

const slides = document.querySelectorAll(".slide");
const showSlide = n => {
  console.log(slides);
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousQuestionButton.style.display = "none";
  } else {
    previousQuestionButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextQuestionButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextQuestionButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
};
showSlide(0);

previousQuestionButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});
nextQuestionButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  console.log(currentSlide);
});

submitButton.addEventListener("click", showResults);
