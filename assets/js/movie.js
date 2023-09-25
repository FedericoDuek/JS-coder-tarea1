// Función para obtener una película aleatoria desde la API de TMDb
function obtenerPeliculaAleatoria() {
    const apiKey = 'eeae407401640aef19a5c29284e82077'; 
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  
    return axios.get(apiUrl)
      .then(response => {
        const peliculas = response.data.results;
        const peliculaAleatoria = peliculas[Math.floor(Math.random() * peliculas.length)];
        return peliculaAleatoria;
      })
      .catch(error => {
        console.error('Error al cargar la película aleatoria:', error);
        throw error; // Propaga el error para que se maneje fuera de la función
      });
  }
  
  // Función para iniciar el juego
  function iniciarJuego() {
    obtenerPeliculaAleatoria()
      .then(pelicula => {
        const tituloPelicula = pelicula.title;
        const espaciosEnBlanco = tituloPelicula.replace(/[a-zA-Z]/g, '_');
        mostrarPelicula(espaciosEnBlanco, tituloPelicula);
      })
      .catch(error => console.error(error));
  }
  
  // Función para mostrar la película en la interfaz
  function mostrarPelicula(peliculaOculta, tituloPelicula) {
    const peliculaContainer = document.getElementById('pelicula-container');
    peliculaContainer.innerHTML = '';
  
    const tituloElement = document.createElement('h2');
    tituloElement.textContent = 'Adivina la Película';
    peliculaContainer.appendChild(tituloElement);
  
    const peliculaTextoElement = document.createElement('p');
    peliculaTextoElement.textContent = peliculaOculta;
    peliculaTextoElement.setAttribute('id', 'pelicula-texto');
    peliculaContainer.appendChild(peliculaTextoElement);
  
    const inputRespuesta = document.createElement('input');
    inputRespuesta.setAttribute('type', 'text');
    inputRespuesta.setAttribute('id', 'input-respuesta');
    peliculaContainer.appendChild(inputRespuesta);
  
    const botonComprobar = document.createElement('button');
    botonComprobar.textContent = 'Comprobar Respuesta';
    peliculaContainer.appendChild(botonComprobar);
  
    botonComprobar.addEventListener('click', () => comprobarRespuesta(tituloPelicula));
  }
  
  // Función para comprobar si la respuesta es correcta
  function comprobarRespuesta(respuestaCorrecta) {
    const inputRespuesta = document.getElementById('input-respuesta');
    const respuestaUsuario = inputRespuesta.value.toLowerCase();
    const tituloPelicula = respuestaCorrecta.toLowerCase();
  
    if (respuestaUsuario === tituloPelicula) {
      mostrarResultado('¡Respuesta correcta!');
    } else {
      mostrarResultado('Respuesta incorrecta. Intenta de nuevo.');
    }
  }
  
  // Función para mostrar el resultado en la interfaz
  function mostrarResultado(resultado) {
    const peliculaTextoElement = document.getElementById('pelicula-texto');
    peliculaTextoElement.textContent = resultado;
  
    const inputRespuesta = document.getElementById('input-respuesta');
    inputRespuesta.value = '';
  
    setTimeout(iniciarJuego, 2000); // Espera 2 segundos antes de mostrar la siguiente película
  }
  
  // Iniciar el juego al cargar la página
  window.addEventListener('load', iniciarJuego);  