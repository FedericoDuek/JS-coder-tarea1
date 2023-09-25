// Función para obtener preguntas de trivia desde una API externa
function obtenerPreguntaTrivia() {
    return axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
      .then(response => response.data.results[0])
      .catch(error => {
        console.error('Error al cargar la pregunta de trivia:', error);
        throw error; // Propaga el error para que se maneje fuera de la función
      });
  }
  
  // Función para mostrar una pregunta en la interfaz
  function mostrarPregunta(pregunta) {
    const preguntaTexto = document.getElementById('pregunta');
    preguntaTexto.textContent = pregunta.question;
  
    const respuestasContainer = document.getElementById('respuestas');
    respuestasContainer.innerHTML = '';
  
    const respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];
    respuestas.sort(() => Math.random() - 0.5); // Baraja las respuestas
  
    respuestas.forEach(respuesta => {
      const botonRespuesta = document.createElement('button');
      botonRespuesta.textContent = respuesta;
      botonRespuesta.addEventListener('click', () => comprobarRespuesta(respuesta, pregunta.correct_answer));
      respuestasContainer.appendChild(botonRespuesta);
    });
  }
  
  // Función para comprobar si la respuesta es correcta
  function comprobarRespuesta(respuesta, respuestaCorrecta) {
    const resultado = document.getElementById('resultado');
    if (respuesta === respuestaCorrecta) {
      resultado.textContent = '¡Respuesta correcta!';
    } else {
      resultado.textContent = 'Respuesta incorrecta. La respuesta correcta era: ' + respuestaCorrecta;
    }
  
    // Obtener y mostrar la siguiente pregunta después de un breve retraso
    setTimeout(() => {
      obtenerPreguntaTrivia()
        .then(pregunta => mostrarPregunta(pregunta))
        .catch(error => console.error(error));
      resultado.textContent = '';
    }, 2000); // Espera 2 segundos antes de mostrar la siguiente pregunta
  }
  
  // Iniciar el juego obteniendo y mostrando la primera pregunta
  obtenerPreguntaTrivia()
    .then(pregunta => mostrarPregunta(pregunta))
    .catch(error => console.error(error));