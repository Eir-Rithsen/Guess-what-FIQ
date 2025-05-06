// script.js

const questions = [
    { img: "img1.jpg", options: ["A", "B", "C"], correct: "A", name: "Instrumento 1" },
    { img: "img2.jpg", options: ["X", "Y", "Z"], correct: "Y", name: "Instrumento 2" }
];

let currentIndex = 0;
let timer;
let timeLimit = 30;
let score = 0;

function loadQuestion() {
    const question = questions[currentIndex];
    document.getElementById("question-image").src = question.img;
    document.getElementById("quiz-options").innerHTML = question.options.map(opt => 
        `<button onclick="selectOption('${opt}')">${opt}</button>`
    ).join('');
    document.getElementById("answer-box").value = "";
    startTimer();
}

function selectOption(option) {
    if (option === questions[currentIndex].correct) {
        score++;
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer-box").value.toLowerCase();
    const correctName = questions[currentIndex].name.toLowerCase();

    if (userAnswer === correctName) {
        document.getElementById("answer-box").classList.add("correct");
    } else {
        document.getElementById("answer-box").classList.add("incorrect");
        document.getElementById("feedback").textContent = `La respuesta correcta era: ${questions[currentIndex].name}`;
    }
}

function startTimer() {
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        document.getElementById("timer").textContent = `Tiempo restante: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
        timeLeft--;
    }, 1000);
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % questions.length;
    loadQuestion();
}

function prevQuestion() {
    currentIndex = (currentIndex - 1 + questions.length) % questions.length;
    loadQuestion();
}

function restartGame() {
    currentIndex = 0;
    score = 0;
    loadQuestion();
}

window.onload = loadQuestion;
