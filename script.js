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
      container.innerHTML = ''; // Limpiar contenido anterior

      data.preguntas.forEach((pregunta) => {
        // Crear un párrafo para la pregunta
        const preguntaTexto = document.createElement('p');
        preguntaTexto.textContent = pregunta.texto;
        container.appendChild(preguntaTexto);

        // Crear botones de respuesta
        pregunta.opciones.forEach((opcion) => {
          const btn = document.createElement('button');
          btn.textContent = opcion;
          btn.onclick = () => checkAnswer(opcion, pregunta.correcta);
          container.appendChild(btn);
        });

        // Espaciado visual entre preguntas
        container.appendChild(document.createElement('hr'));
      });
    })
    .catch(error => console.error("Error cargando las preguntas:", error));
}

function checkAnswer(opcionSeleccionada, respuestaCorrecta) {
  if (opcionSeleccionada === respuestaCorrecta) {
    alert("¡Correcto! ✅");
  } else {
    alert("Incorrecto, intenta de nuevo. ❌");
  }
}
