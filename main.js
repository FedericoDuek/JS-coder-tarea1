const readline = require('readline');

// Función para generar un número aleatorio entre min y max
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Función principal del juego
function jugarAdivinanza() {
  const numeroSecreto = generarNumeroAleatorio(1, 100);
  let intentos = 0;
  const maxIntentos = 10;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const hacerIntento = () => {
    rl.question('Adivina el número secreto (entre 1 y 100): ', (intentoUsuarioStr) => {
      const intentoUsuario = parseInt(intentoUsuarioStr);

      if (!validarNumero(intentoUsuario)) {
        console.log('Por favor, ingresa un número válido entre 1 y 100.');
        hacerIntento();
        return;
      }

      intentos++;

      const resultado = verificarIntento(intentoUsuario, numeroSecreto);

      if (resultado === 'acierto') {
        console.log(`¡Felicitaciones! Adivinaste el número secreto ${numeroSecreto} en ${intentos} intentos.`);
        rl.close();
      } else if (resultado === 'mayor') {
        console.log('El número secreto es mayor. ¡Sigue intentando!');
        if (intentos < maxIntentos) {
          hacerIntento();
        } else {
          console.log(`Agotaste los ${maxIntentos} intentos. El número secreto era ${numeroSecreto}.`);
          rl.close();
        }
      } else {
        console.log('El número secreto es menor. ¡Sigue intentando!');
        if (intentos < maxIntentos) {
          hacerIntento();
        } else {
          console.log(`Agotaste los ${maxIntentos} intentos. El número secreto era ${numeroSecreto}.`);
          rl.close();
        }
      }
    });
  };

  hacerIntento();
}

// Llamada a la función para iniciar el juego
jugarAdivinanza();
