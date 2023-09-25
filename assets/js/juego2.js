// Función para generar un número aleatorio entre min y max
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Declaración de variables y objetos necesarios
  const intentosElement = document.getElementById("intentos");
  const resultadoElement = document.getElementById("resultado");
  const intentoUsuarioElement = document.getElementById("intentoUsuario");
  const realizarIntentoButton = document.getElementById("realizarIntento");
  const historialElement = document.getElementById("historial");
  const cargarDatosButton = document.getElementById("cargarDatos");
  
  let intentos = 0;
  const maxIntentos = 10;
  let numeroSecreto = generarNumeroAleatorio(1, 100);
  
  // Función para verificar si el número ingresado es válido
  function validarNumero(numero) {
    return !isNaN(numero) && Number.isInteger(numero) && numero >= 1 && numero <= 100;
  }
  
  // Función que contiene el algoritmo con un condicional
  function verificarIntento(intentoUsuario, numeroSecreto) {
    if (intentoUsuario === numeroSecreto) {
      return 'acierto';
    } else if (intentoUsuario < numeroSecreto) {
      return 'mayor';
    } else {
      return 'menor';
    }
  }
  
  // Función para actualizar el historial en la interfaz
  function actualizarHistorial(historial) {
    historialElement.innerHTML = '';
    historial.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `Intento: ${item.intentoUsuario}, Resultado: ${item.resultado}`;
      historialElement.appendChild(listItem);
    });
  }
  
  // Función para cargar datos desde una API utilizando Axios
  function cargarDatosDesdeAPI() {
    // Simulamos una solicitud a una API ficticia
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        // Manipular los datos recibidos, por ejemplo, actualizar el DOM
        resultadoElement.textContent = `Datos cargados desde la API: ${response.data.title}`;
      })
      .catch(error => {
        console.error('Error al cargar datos desde la API:', error);
      });
  }
  
  // Evento para cargar datos desde la API al hacer clic en el botón
  cargarDatosButton.addEventListener('click', cargarDatosDesdeAPI);
  
  // Función principal del juego
  function jugarAdivinanza() {
    intentos++;
    const intentoUsuario = parseInt(intentoUsuarioElement.value);
  
    if (!validarNumero(intentoUsuario)) {
      resultadoElement.textContent = 'Por favor, ingresa un número válido entre 1 y 100.';
      return;
    }
  
    const resultado = verificarIntento(intentoUsuario, numeroSecreto);
    intentosElement.textContent = intentos;
  
    if (resultado === 'acierto') {
      resultadoElement.textContent = `¡Felicitaciones! Adivinaste el número secreto ${numeroSecreto} en ${intentos} intentos.`;
      realizarIntentoButton.disabled = true;
    } else if (resultado === 'mayor') {
      resultadoElement.textContent = 'El número secreto es mayor. ¡Sigue intentando!';
    } else {
      resultadoElement.textContent = 'El número secreto es menor. ¡Sigue intentando!';
    }
  
    // Almacenar el resultado en el localStorage utilizando JSON
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push({ intentoUsuario, resultado });
    localStorage.setItem('historial', JSON.stringify(historial));
  
    // Actualizar el historial en la interfaz
    actualizarHistorial(historial);
  }
  
  // Llamada a la función para iniciar el juego
  realizarIntentoButton.addEventListener('click', jugarAdivinanza);
  
  // Recuperar datos almacenados en el localStorage al cargar la página
  window.addEventListener('load', function () {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    actualizarHistorial(historial);
  });  