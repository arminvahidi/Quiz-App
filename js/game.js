import formatData from "./helper.js";

//-----------------

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const nextButton = document.getElementById("next-button");
const qN = document.getElementById("question-number");
const scoreNumber = document.getElementById("score");

//------------------

const CORRECT_BONUS = 10;
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let questionNumber = 1;
let score = 0;
let isAccepted = true;

//-------------------

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formatedData = formatData(json.results);
  console.log(formatedData);
  start();
};

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } = formatedData[questionIndex];
  console.log(answers);
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer)
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreNumber.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  if(questionIndex === 9) return
  questionIndex++
  showQuestion()
}

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

//----------------------

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
