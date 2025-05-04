document.getElementById('guess-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
  const inputBox = document.getElementById('guess-input');

  if (userGuess === "tijeras de metzenbaum") {
    showMessage("¡Correcto! ✅");
    inputBox.classList.add("correct");
    loadQuestions();
  } else {
    showMessage("Incorrecto, intenta de nuevo ❌");
    inputBox.classList.add("incorrect");
  }

  setTimeout(() => {
    inputBox.classList.remove("correct", "incorrect");
  }, 2000);
});

function loadQuestions() {
  fetch('preguntas/tijeras_metzenbaum.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('multiple-choice');
      container.innerHTML = '';

      data.preguntas.forEach((pregunta) => {
        const preguntaTexto = document.createElement('p');
        preguntaTexto.textContent = pregunta.texto;
        container.appendChild(preguntaTexto);

        pregunta.opciones.forEach((opcion) => {
          const btn = document.createElement('button');
          btn.textContent = opcion;
          btn.onclick = () => checkAnswer(btn, opcion, pregunta.correcta);
          container.appendChild(btn);
        });

        container.appendChild(document.createElement('hr'));
      });
    });
}

function checkAnswer(button, opcionSeleccionada, respuestaCorrecta) {
  if (opcionSeleccionada === respuestaCorrecta) {
    showMessage("¡Correcto! ✅");
    button.classList.add("correct");
  } else {
    showMessage("Incorrecto ❌");
    button.classList.add("incorrect");
  }

  setTimeout(() => {
    button.classList.remove("correct", "incorrect");
  }, 2000);
}

function showMessage(text) {
  const popup = document.getElementById("message-popup");
  popup.textContent = text;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}
