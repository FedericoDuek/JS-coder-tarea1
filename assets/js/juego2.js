document.addEventListener("DOMContentLoaded", function() {
    // generar un número aleatorio entre min y max
    function generarNumeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //variables y objetos necesarios
    const intentosElement = document.getElementById("intentos");
    const resultadoElement = document.getElementById("resultado");
    const intentoUsuarioElement = document.getElementById("intentoUsuario");
    const realizarIntentoButton = document.getElementById("realizarIntento");
    const historialElement = document.getElementById("historial");

    let intentos = 0;
    const maxIntentos = 10;
    let numeroSecreto = generarNumeroAleatorio(1, 100);

    // verificar si el número ingresado es válido
    function validarNumero(numero) {
        return !isNaN(numero) && Number.isInteger(numero) && numero >= 1 && numero <= 100;
    }

    // función principal del juego
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

            // limpiar historial
            localStorage.removeItem('historial');
        } else if (resultado === 'mayor') {
            resultadoElement.textContent = 'El número secreto es mayor. ¡Sigue intentando!';
        } else {
            resultadoElement.textContent = 'El número secreto es menor. ¡Sigue intentando!';
        }

        // almacenar el resultado en el historial
        const historial = JSON.parse(localStorage.getItem('historial')) || [];
        historial.push({ intentoUsuario, resultado });
        localStorage.setItem('historial', JSON.stringify(historial));

        // actualizar el historial 
        actualizarHistorial(historial);
    }

    // llamada para iniciar el juego
    realizarIntentoButton.addEventListener('click', jugarAdivinanza);

    // recuperar datos almacenados al cargar la página
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    actualizarHistorial(historial);

    // algoritmo con un condicional
    function verificarIntento(intentoUsuario, numeroSecreto) {
        if (intentoUsuario === numeroSecreto) {
            return 'acierto';
        } else if (intentoUsuario < numeroSecreto) {
            return 'mayor';
        } else {
            return 'menor';
        }
    }

    // actualizar el historial
    function actualizarHistorial(historial) {
        historialElement.innerHTML = '';
        historial.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Intento: ${item.intentoUsuario}, Resultado: ${item.resultado}`;
            historialElement.appendChild(listItem);
        });
    }
});