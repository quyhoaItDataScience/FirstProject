class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 300;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Smooth scrolling

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("nav a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      let hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  document.getElementById("hobbies").scrollIntoView();
  console.log("hello");
});

//
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const explaination = document.getElementById("explain");

let currentQuestionIndex = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    const p = document.createElement("p");
    p.innerHTML = "Thanks for joining";
    p.classList.add("result-text");
    const questionContainer = document.querySelector("#question-container");
    while (questionContainer.firstChild) {
      questionContainer.removeChild(questionContainer.firstChild);
    }
    questionContainer.appendChild(p);
  }
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn-answer");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  explaination.classList.add("hidden");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  explaination.classList.remove("hidden");
  explaination.innerText = questions[currentQuestionIndex].explain;
  if (questions.length > currentQuestionIndex) {
    nextButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 1 + 1?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: false },
      { text: "2 ", correct: false },
      { text: "= 3 n???u nh?? ta y??u m??i ", correct: true },
    ],
    explain: "Just the beginning, relax man!",
  },
  {
    question: "What is my name?",
    answers: [
      { text: "Qu??", correct: false },
      { text: "H??a", correct: false },
      { text: "H??a Qu??", correct: false },
      { text: "Qu?? H??a", correct: true },
    ],
    explain: "Kh??ng tr??? l???i ???????c l?? d??? r???i",
  },
  {
    question: "Who is my girlfriend?",
    answers: [
      { text: "Th???o", correct: false },
      { text: "Lan", correct: false },
      { text: "Hu???", correct: false },
      { text: "Ng???c", correct: false },
    ],
    explain: "H???i vui th??i ch??? c?? ????o ????u. FA is the best!",
  },
  {
    question: "H???c l???p tr??nh c?? vui kh??ng?",
    answers: [
      { text: "H??i h??i", correct: false },
      { text: "YES!!!", correct: false },
      { text: "M???t b??? b???", correct: true },
      { text: "Kh??ng bi???t", correct: false },
    ],
    explain: "Mu???n x???u up x???u down ????",
  },
  {
    question: "Cu???n s??ch hay nh???t m??nh t???ng ?????c?",
    answers: [
      { text: "?????c Nh??n T??m", correct: false },
      { text: "S??ch Gi??o Khoa", correct: false },
      { text: "Harry Potter", correct: true },
      { text: "Cho t??i 1 v?? v??? tu???i th??", correct: false },
    ],
    explain: "Harry Potter never dies ????",
  },
];
