// script.js

let data = [];
let currentIndex = 0;
let startTime;
let timerInterval;

// Función para cargar los datos desde el JSON
async function loadData() {
  try {
    const response = await fetch('data.json');
    data = await response.json();
    shuffleArray(data);
    displayCurrentItem();
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

// Función para mostrar la imagen y las preguntas actuales
function displayCurrentItem() {
  const currentItem = data[currentIndex];
  document.getElementById('instrument-image').src = `images/${currentItem.image}`;
  const questionsContainer = document.getElementById('questions-container');
  questionsContainer.innerHTML = '';

  currentItem.questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.options.forEach(option => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${index}`;
      input.value = option;
      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });
}

// Función para aleatorizar un arreglo
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Función para iniciar el temporizador
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Tiempo: ${elapsed} segundos`;
  }, 1000);
}

// Función para detener el temporizador
function stopTimer() {
  clearInterval(timerInterval);
}

// Función para reiniciar el juego
function resetGame() {
  currentIndex = 0;
  shuffleArray(data);
  displayCurrentItem();
  stopTimer();
  startTimer();
}

// Event listeners para los botones
document.getElementById('next-button').addEventListener('click', () => {
  if (currentIndex < data.length - 1) {
    currentIndex++;
    displayCurrentItem();
  } else {
    stopTimer();
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    alert(`¡Has terminado! Tiempo total: ${totalTime} segundos`);
  }
});

document.getElementById('prev-button').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayCurrentItem();
  }
});

document.getElementById('reset-button').addEventListener('click', () => {
  resetGame();
});

// Inicio del juego
window.addEventListener('load', () => {
  loadData();
  startTimer();
});
