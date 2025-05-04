let currentQuestionIndex = 0;
let questionsData = [];

document.getElementById('guess-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');

  if (userGuess === "tijeras de metzenbaum") {
    feedback.textContent = "✅ ¡Correcto!";
    feedback.classList.add("correct");
    showMessage("¡Bien hecho! 🎉");
    loadQuestions();
  } else {
    feedback.textContent = "❌ Incorrecto, intenta de nuevo.";
    feedback.classList.add("incorrect");
    showMessage("Respuesta equivocada. ❌");
  }

  setTimeout(() => {
    feedback.classList.remove("correct", "incorrect");
  }, 2000);
});

function loadQuestions() {
  fetch('preguntas/tijeras_metzenbaum.json')
    .then(response => response.json())
    .then(data => {
      questionsData = data.preguntas;
      currentQuestionIndex = 0;
      showQuestion();
    })
    .catch(error => console.error("Error cargando preguntas:", error));
}

function showQuestion() {
  const container = document.getElementById('multiple-choice');
  container.innerHTML = '';

  if (questionsData.length > 0) {
    const pregunta = questionsData[currentQuestionIndex];

    const preguntaTexto = document.createElement('p');
    preguntaTexto.textContent = pregunta.texto;
    container.appendChild(preguntaTexto);

    pregunta.opciones.forEach((opcion) => {
      const btn = document.createElement('button');
      btn.textContent = opcion;
      btn.onclick = () => checkAnswer(btn, opcion, pregunta.correcta);
      container.appendChild(btn);
    });
  }
}

function checkAnswer(button, opcionSeleccionada, respuestaCorrecta) {
  if (opcionSeleccionada === respuestaCorrecta) {
    button.classList.add("correct");
    showMessage("¡Respuesta correcta! ✅");
  } else {
    button.classList.add("incorrect");
    showMessage("Intenta de nuevo. ❌");
  }

  setTimeout(() => {
    button.classList.remove("correct", "incorrect");
  }, 2000);
}

// Manejo de botones de navegación
document.getElementById('prev-question').addEventListener('click', function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
});

document.getElementById('next-question').addEventListener('click', function () {
  if (currentQuestionIndex < questionsData.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  }
});

function showMessage(text) {
  const popup = document.getElementById("message-popup");
  popup.textContent = text;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}
