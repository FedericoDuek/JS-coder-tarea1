// preguntas de trivia 
function obtenerPreguntaTrivia() {
  // preguntas 
  const preguntas = [
    {
      question: "¿Cuál es la capital de Francia?",
      incorrect_answers: ["Londres", "Madrid", "Berlín"],
      correct_answer: "París"
    },
    {
      question: "¿Cuál es el planeta más grande del sistema solar?",
      incorrect_answers: ["Tierra", "Marte", "Venus"],
      correct_answer: "Júpiter"
    },
    {
      question: "¿Cual es la seleccion con mas mundiales?",
      incorrect_answers: ["Alemania", "Italia", "Francia"],
      correct_answer: "Brasil"
    },
    {
      question: "¿Quien es el jugador con mas balones de oro?",
      incorrect_answers: ["Maradona", "Henry", "Cristiano Ronaldo"],
      correct_answer: "Messi"
    },
    {
      question: "¿Cual es el pais mas grande del mundo?",
      incorrect_answers: ["Brasil", "Canada", "Argentina"],
      correct_answer: "Rusia"
    }
  ];

  // pregunta aleatoria 
  return preguntas[Math.floor(Math.random() * preguntas.length)];
}

// mostrar una pregunta 
function mostrarPregunta(pregunta) {
  const preguntaTexto = document.getElementById('pregunta');
  preguntaTexto.textContent = pregunta.question;

  const respuestasContainer = document.getElementById('respuestas');
  respuestasContainer.innerHTML = '';

  const respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];
  respuestas.sort(() => Math.random() - 0.5); // baraja las respuestas

  respuestas.forEach(respuesta => {
    const botonRespuesta = document.createElement('button');
    botonRespuesta.textContent = respuesta;
    botonRespuesta.addEventListener('click', () => comprobarRespuesta(respuesta, pregunta.correct_answer));
    respuestasContainer.appendChild(botonRespuesta);
  });
}

// comprobar si la respuesta es correcta
function comprobarRespuesta(respuesta, respuestaCorrecta) {
  if (respuesta === respuestaCorrecta) {
    mostrarResultado('¡Respuesta correcta!');
  } else {
    mostrarResultado(`Respuesta incorrecta. La respuesta correcta era: ${respuestaCorrecta}`);
  }
}

//  mostrar el resultado 
function mostrarResultado(resultado) {
  const resultadoElement = document.getElementById('resultado');
  resultadoElement.textContent = resultado;

  // obtener y mostrar la siguiente pregunta 
  setTimeout(() => {
      if (confirm('¿Quieres jugar otra vez?')) {
          const siguientePregunta = obtenerPreguntaTrivia();
          mostrarPregunta(siguientePregunta);
          resultadoElement.textContent = '';
      } else {
         
          console.log('Gracias por jugar. Hasta luego!');
      }
  }, 1000); // espera 1 segundo 
}

// iniciar el juego obteniendo mostrando la primera pregunta
const primeraPregunta = obtenerPreguntaTrivia();
mostrarPregunta(primeraPregunta);
