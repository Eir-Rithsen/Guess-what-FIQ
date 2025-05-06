// script.js

let data = [];
let currentIndex = 0;
let startTime;
let timerInterval;

async function loadData() {
  try {
    const response = await fetch('data.json');
    const jsonData = await response.json();

    if (!validateData(jsonData)) {
      alert('Error en el formato del archivo JSON.');
      return;
    }

    data = jsonData;
    shuffleArray(data);
    displayCurrentItem();
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

function validateData(json) {
  if (!Array.isArray(json)) return false;
  return json.every(item =>
    typeof item.image === 'string' &&
    Array.isArray(item.questions) &&
    item.questions.every(q =>
      typeof q.question === 'string' &&
      Array.isArray(q.options) && q.options.length > 0 &&
      typeof q.answer === 'string'
    )
  );
}

function displayCurrentItem() {
  const currentItem = data[currentIndex];
  document.getElementById('instrument-image').src = `imagenes/${currentItem.image}`;
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Tiempo: ${elapsed} segundos`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetGame() {
  currentIndex = 0;
  shuffleArray(data);
  displayCurrentItem();
  stopTimer();
  startTimer();
}

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

window.addEventListener('load', () => {
  loadData();
  startTimer();
});
