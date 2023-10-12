function obtenerPeliculaAleatoria() {
  const apiKey = 'eeae407401640aef19a5c29284e82077';
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  return fetch(apiUrl)
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Error al cargar la película aleatoria.');
      })
      .then(data => {
          const peliculas = data.results;
          const peliculaAleatoria = peliculas[Math.floor(Math.random() * peliculas.length)];
          return peliculaAleatoria;
      })
      .catch(error => {
          console.error('Error al cargar la película aleatoria:', error);
          throw error;
      });
}

function mostrarPelicula(pelicula) {
  const peliculaContainer = document.getElementById('pelicula-container');
  peliculaContainer.innerHTML = '';

  const tituloElement = document.createElement('h2');
  tituloElement.textContent = `Adivina la Película (${pelicula.release_date.split('-')[0]})`;
  peliculaContainer.appendChild(tituloElement);

  const imagenElement = document.createElement('img');
  imagenElement.src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
  imagenElement.alt = `Poster de ${pelicula.title}`;
  peliculaContainer.appendChild(imagenElement);

  const peliculaTextoElement = document.createElement('p');
  peliculaTextoElement.textContent = pelicula.title.replace(/[a-zA-Z]/g, '_');
  peliculaTextoElement.setAttribute('id', 'pelicula-texto');
  peliculaContainer.appendChild(peliculaTextoElement);

  const inputRespuesta = document.createElement('input');
  inputRespuesta.setAttribute('type', 'text');
  inputRespuesta.setAttribute('id', 'input-respuesta');
  peliculaContainer.appendChild(inputRespuesta);

  const botonComprobar = document.createElement('button');
  botonComprobar.textContent = 'Comprobar Respuesta';
  peliculaContainer.appendChild(botonComprobar);

  botonComprobar.addEventListener('click', () => comprobarRespuesta(pelicula.title));
}

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

function mostrarResultado(resultado) {
  const peliculaTextoElement = document.getElementById('pelicula-texto');
  peliculaTextoElement.textContent = resultado;

  const inputRespuesta = document.getElementById('input-respuesta');
  inputRespuesta.value = '';

  setTimeout(iniciarJuego, 1000); 
}

function iniciarJuego() {
  obtenerPeliculaAleatoria()
      .then(pelicula => {
          mostrarPelicula(pelicula);
      })
      .catch(error => console.error(error));
}

window.addEventListener('load', iniciarJuego);