// script.js

function displayCurrentItem() {
  const currentItem = data[currentIndex];
  const imageElement = document.getElementById('instrument-image');
  
  // Asegúrate de que la ruta esté bien definida
  imageElement.src = `imagenes/${encodeURIComponent(currentItem.image)}`;
  imageElement.onerror = function() {
    console.error("Error al cargar la imagen:", imageElement.src);
  };

  const questionsContainer = document.getElementById('questionsContainer');
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
