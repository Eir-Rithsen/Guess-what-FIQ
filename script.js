document.addEventListener("DOMContentLoaded", () => { let instruments = []; let currentIndex = 0; let correctAnswers = 0; let startTime; let timerInterval; const userNameInput = document.getElementById("username");

const instrumentImage = document.getElementById("instrument-image"); const questionText = document.getElementById("question-text"); const answerInput = document.getElementById("answer-input"); const feedback = document.getElementById("feedback"); const extraQuestion = document.getElementById("extra-question"); const extraQuestionContainer = document.getElementById("extra-question-container"); const extraButtons = document.getElementById("extra-buttons"); const previousBtn = document.getElementById("previous-btn"); const nextBtn = document.getElementById("next-btn"); const checkBtn = document.getElementById("check-btn"); const restartBtn = document.getElementById("restart-btn"); const scoreBoard = document.getElementById("score-board"); const timerDisplay = document.getElementById("timer"); const startBtn = document.getElementById("start-btn"); const gameContainer = document.getElementById("game-container"); const scoreTable = document.getElementById("score-table");

const correctSound = new Audio("assets/sounds/correct.mp3"); const incorrectSound = new Audio("assets/sounds/incorrect.mp3");

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

const startGame = async () => { const username = userNameInput.value.trim(); if (!username) { alert("Por favor, ingresa tu nombre."); return; }

instruments = await loadInstruments();
instruments = shuffleArray(instruments);

correctAnswers = 0;
currentIndex = 0;
startTime = Date.now();
timerInterval = setInterval(updateTimer, 1000);
gameContainer.style.display = "block";
startBtn.disabled = true;
restartBtn.disabled = false;
renderInstrument();

};

const updateTimer = () => { const seconds = Math.floor((Date.now() - startTime) / 1000); timerDisplay.textContent = ${seconds}s; };

const loadInstruments = async () => { const response = await fetch("imagenes/listado.json"); const imageList = await response.json();

const promises = imageList.map(async (file) => {
  const baseName = file.replace(/\..+$/, '').toLowerCase().replace(/ /g, '_');
  const jsonPath = `preguntas/${baseName}.json`;
  const imgPath = `imagenes/${file}`;
  const response = await fetch(jsonPath);
  const data = await response.json();
  return { img: imgPath, ...data };
});

return Promise.all(promises);

};

const renderInstrument = () => { const item = instruments[currentIndex]; instrumentImage.src = item.img; questionText.textContent = "¿Qué instrumento quirúrgico es este?"; answerInput.value = ""; feedback.textContent = ""; extraQuestion.textContent = item.pregunta_adicional; extraQuestionContainer.style.display = "block"; renderExtraButtons(); };

const renderExtraButtons = () => { const options = shuffleArray(["Sí", "No"]); extraButtons.innerHTML = ""; options.forEach((opt) => { const btn = document.createElement("button"); btn.textContent = opt; btn.className = "extra-btn"; btn.addEventListener("click", () => handleExtraResponse(opt)); extraButtons.appendChild(btn); }); };

const handleExtraResponse = (answer) => { const item = instruments[currentIndex]; const isCorrect = answer.toLowerCase() === item.respuesta_adicional.toLowerCase(); if (isCorrect) { correctAnswers++; feedback.innerHTML += '<p class="correct">¡Correcto en adicional!</p>'; correctSound.play(); } else { feedback.innerHTML += '<p class="incorrect">Incorrecto en adicional.</p>'; incorrectSound.play(); } };

const saveScore = () => { const username = userNameInput.value.trim(); const timeTaken = Math.floor((Date.now() - startTime) / 1000); const scoreData = { name: username, correctAnswers, timeTaken, date: new Date().toLocaleString(), };

const history = JSON.parse(localStorage.getItem("scores") || "[]");
history.push(scoreData);
localStorage.setItem("scores", JSON.stringify(history));
renderScoreTable(history);

};

const renderScoreTable = (scores) => { scoreTable.innerHTML = "<tr><th>Nombre</th><th>Correctas</th><th>Tiempo</th><th>Fecha</th></tr>"; scores.forEach((score) => { const row = document.createElement("tr"); row.innerHTML = <td>${score.name}</td><td>${score.correctAnswers}</td><td>${score.timeTaken}s</td><td>${score.date}</td>; scoreTable.appendChild(row); }); };

checkBtn.addEventListener("click", () => { const item = instruments[currentIndex]; const userAnswer = answerInput.value.trim().toLowerCase(); const correctAnswer = item.nombre.toLowerCase();

if (userAnswer === correctAnswer) {
  feedback.innerHTML = '<p class="correct">¡Correcto!</p>';
  correctAnswers++;
  correctSound.play();
} else {
  feedback.innerHTML = '<p class="incorrect">❌ Incorrecto, intenta de nuevo.</p>';
  incorrectSound.play();
}

});

nextBtn.addEventListener("click", () => { if (currentIndex < instruments.length - 1) { currentIndex++; renderInstrument(); } else { clearInterval(timerInterval); saveScore(); alert("Juego terminado"); } });

previousBtn.addEventListener("click", () => { if (currentIndex > 0) { currentIndex--; renderInstrument(); } });

restartBtn.addEventListener("click", () => { clearInterval(timerInterval); startBtn.disabled = false; restartBtn.disabled = true; userNameInput.value = ""; gameContainer.style.display = "none"; timerDisplay.textContent = "0s"; scoreBoard.textContent = ""; instruments = []; currentIndex = 0; correctAnswers = 0; });

startBtn.addEventListener("click", startGame);

const history = JSON.parse(localStorage.getItem("scores") || "[]"); renderScoreTable(history); });

