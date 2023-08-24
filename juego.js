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

  const hacerIntento = () => {
    const intentoUsuarioStr = prompt('Adivina el número secreto (entre 1 y 100): ');
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
    } else if (resultado === 'mayor') {
      console.log('El número secreto es mayor. ¡Sigue intentando!');
      if (intentos < maxIntentos) {
        hacerIntento();
      } else {
        console.log(`Agotaste los ${maxIntentos} intentos. El número secreto era ${numeroSecreto}.`);
      }
    } else {
      console.log('El número secreto es menor. ¡Sigue intentando!');
      if (intentos < maxIntentos) {
        hacerIntento();
      } else {
        console.log(`Agotaste los ${maxIntentos} intentos. El número secreto era ${numeroSecreto}.`);
      }
    }
  };

  hacerIntento();
}

// Llamada a la función para iniciar el juego
jugarAdivinanza();

// Objeto que representa a una persona
const persona = {
  nombre: "Juan",
  edad: 30,
  ocupacion: "Desarrollador"
};

console.log("Información de la persona:");
console.log("Nombre:", persona.nombre);
console.log("Edad:", persona.edad);
console.log("Ocupación:", persona.ocupacion);

// Declaración de variables y objetos necesarios
const numero1 = 10;
const numero2 = 20;
const cadena1 = "Hola, ";
const cadena2 = "¿cómo estás?";
const arrayNumeros = [5, 10, 15, 20, 25];

// Funciones esenciales del proceso a simular
function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function concatenar(str1, str2) {
  return str1 + str2;
}

function division(a, b) {
  if (b !== 0) {
    return a / b;
  } else {
    return "No es posible dividir por cero.";
  }
}

function porcentaje(total, porcentaje) {
  return (total * porcentaje) / 100;
}

// Uso de las funciones
console.log("Suma:", suma(numero1, numero2));
console.log("Resta:", resta(numero1, numero2));
console.log("Concatenación:", concatenar(cadena1, cadena2));
console.log("División:", division(numero1, numero2));
console.log("Porcentaje:", porcentaje(numero1, 20));

// Arrays y métodos de búsqueda y filtrado
console.log("Array:", arrayNumeros);
console.log("Índice de 15:", arrayNumeros.indexOf(15));
console.log("Elementos mayores que 10:", arrayNumeros.filter(num => num > 10));
