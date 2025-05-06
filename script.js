// script.js

import { loginWithGoogle, saveScore, getLeaderboard } from "./firebase.js";

let questionsData = [];
let currentIndex = 0;
let timer;
let timeLimit = 30;
let score = 0;

// Cargar preguntas desde JSON
fetch("main.json")
    .then(response => response.json())
    .then(data => {
        questionsData = data;
        shuffleQuestions();
        loadQuestion();
    })
    .catch(error => console.error("Error al cargar JSON:", error));

// Mezclar aleatoriamente las preguntas
function shuffleQuestions() {
    questionsData.sort(() => Math.random() - 0.5);
}

// Cargar pregunta actual
function loadQuestion() {
    const questionSet = questionsData[currentIndex];
    
    // Verifica la existencia de la imagen y actualiza el src
    const imagePath = `imagenes/${questionSet.image}`;
    document.getElementById("question-image").src = imagePath;
    document.getElementById("question-image").alt = questionSet.image;

    let optionsHtml = questionSet.questions.map(q => 
        `<div>
            <p>${q.question}</p>
            ${q.options.map(opt => `<button onclick="checkOption('${opt}', '${q.answer}')">${opt}</button>`).join('')}
        </div>`
    ).join('');

    document.getElementById("quiz-options").innerHTML = optionsHtml;
    document.getElementById("answer-box").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("answer-box").classList.remove("correct", "incorrect");
    startTimer();
}

// Validación de opción seleccionada
function checkOption(selected, correct) {
    if (selected === correct) {
        alert("¡Correcto!");
        score++;
    } else {
        alert("Incorrecto. La respuesta correcta era: " + correct);
    }
}

// Validación de nombre ingresado
function checkAnswer() {
    const userAnswer = document.getElementById("answer-box").value.toLowerCase().trim();
    const correctName = questionsData[currentIndex].image.replace(".jpg", "").toLowerCase().trim();

    if (userAnswer === correctName) {
        document.getElementById("answer-box").classList.add("correct");
        document.getElementById("feedback").textContent = "¡Correcto!";
    } else {
        document.getElementById("answer-box").classList.add("incorrect");
        document.getElementById("feedback").textContent = `La respuesta correcta era: ${correctName}`;
    }
}

// Temporizador
function startTimer() {
    let timeLeft = timeLimit;
    clearInterval(timer); // Reiniciar timer si existe uno activo
    timer = setInterval(() => {
        document.getElementById("timer").textContent = `Tiempo restante: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
        timeLeft--;
    }, 1000);
}

// Navegación entre preguntas
function nextQuestion() {
    currentIndex = (currentIndex + 1) % questionsData.length;
    loadQuestion();
}

function prevQuestion() {
    currentIndex = (currentIndex - 1 + questionsData.length) % questionsData.length;
    loadQuestion();
}

function restartGame() {
    currentIndex = 0;
    score = 0;
    shuffleQuestions();
    loadQuestion();
}

// Cargar la primera pregunta cuando la página esté lista
window.onload = loadQuestion;
