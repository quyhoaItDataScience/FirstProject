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
      { text: "= 3 nếu như ta yêu mãi ", correct: true },
    ],
    explain: "Just the beginning, relax man!",
  },
  {
    question: "What is my name?",
    answers: [
      { text: "Quý", correct: false },
      { text: "Hòa", correct: false },
      { text: "Hòa Quý", correct: false },
      { text: "Quý Hòa", correct: true },
    ],
    explain: "Không trả lời được là dở rồi",
  },
  {
    question: "Who is my girlfriend?",
    answers: [
      { text: "Thảo", correct: false },
      { text: "Lan", correct: false },
      { text: "Huệ", correct: false },
      { text: "Ngọc", correct: false },
    ],
    explain: "Hỏi vui thôi chứ có đéo đâu. FA is the best!",
  },
  {
    question: "Học lập trình có vui không?",
    answers: [
      { text: "Hơi hơi", correct: false },
      { text: "YES!!!", correct: false },
      { text: "Mệt bỏ bố", correct: true },
      { text: "Không biết", correct: false },
    ],
    explain: "Muốn xỉu up xỉu down 😫",
  },
  {
    question: "Cuốn sách hay nhất mình từng đọc?",
    answers: [
      { text: "Đắc Nhân Tâm", correct: false },
      { text: "Sách Giáo Khoa", correct: false },
      { text: "Harry Potter", correct: true },
      { text: "Cho tôi 1 vé về tuổi thơ", correct: false },
    ],
    explain: "Harry Potter never dies 😊",
  },
];
