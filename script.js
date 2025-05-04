document.getElementById('guess-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();

  if (userGuess === "tijeras de metzenbaum") {
    document.getElementById('feedback').textContent = "¡Correcto! 🎉";
    loadQuestions();
  } else {
    document.getElementById('feedback').textContent = "Incorrecto, intenta de nuevo.";
  }
});

function loadQuestions() {
  fetch('preguntas/tijeras_metzenbaum.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('multiple-choice');
      container.innerHTML = '';
      data.preguntas.forEach((pregunta) => {
        const btn = document.createElement('button');
        btn.textContent = pregunta.texto;
        btn.onclick = () => checkAnswer(pregunta.correcta);
        container.appendChild(btn);
      });
    });
}

function checkAnswer(correcta) {
  if (correcta) {
    alert("¡Correcto!");
  } else {
    alert("Incorrecto, prueba otra opción.");
  }
}
