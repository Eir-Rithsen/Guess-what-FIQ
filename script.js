// script.js
const quizData = [
  {
    image: 'images/instrumento1.jpg',
    questions: [
      '¿Pregunta 1 del instrumento 1?',
      '¿Pregunta 2 del instrumento 1?'
    ]
  },
  {
    image: 'images/instrumento2.jpg',
    questions: [
      '¿Pregunta 1 del instrumento 2?',
      '¿Pregunta 2 del instrumento 2?'
    ]
  }
  // Agrega más objetos según sea necesario
];

let currentIndex = 0;
let timerInterval;
let secondsElapsed = 0;

const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('startBtn');
const quizSection = document.querySelector('.quiz');
const quizImage = document.getElementById('quizImage');
const questionsContainer = document.getElementById('questionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');

startBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username === '') {
    alert('Por favor, ingresa tu nombre.');
    return;
  }
  document.querySelector('.user-info').style.display = 'none';
  quizSection.style.display = 'block';
  startTimer();
  loadQuizItem();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuizItem();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < quizData.length - 1) {
    currentIndex++;
    loadQuizItem();
  } else {
    stopTimer();
    alert(`¡Has completado el cuestionario en ${formatTime(secondsElapsed)}!`);
  }
});

resetBtn.addEventListener('click', () => {
  location.reload();
});

function loadQuizItem() {
  const currentItem = quizData[currentIndex];
  quizImage.src = currentItem.image;
  questionsContainer.innerHTML = '';
  currentItem.questions.forEach((q, index) => {
    const p = document.createElement('p');
    p.textContent = q;
    questionsContainer.appendChild(p);
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerDisplay.textContent = formatTime(secondsElapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}