let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma");
let contenedorNombre = document.querySelector("#nomJugador");

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let nombre = prompt("Nombre del Jugador: ");
// mensaje en pantalla para ingresar nombre
while(nombre === ""){
    alert("Debe seleccionar un nombre para empezar!");
    nombre = prompt("Nombre del Jugador: ");
}

contenedorNombre.innerText = nombre;
let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});

function iniciarTurno(e) {
    // se genera un numero aleatorio
    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    // piedra => 0
    // papel => 1
    // tijera => 2

    if (eleccionPC === 0) {
        eleccionPC = "piedra 🪨";
    } else if (eleccionPC === 1) {
        eleccionPC = "papel 📋"
    } else if (eleccionPC === 2) {
        eleccionPC = "tijera ✂️"
    }

    // piedra vence a tijera
    // tijera vence a papel
    // papel vence a piedra
    // si son iguales es empate

    if (
        (eleccionUsuario === "piedra 🪨" && eleccionPC === "tijera ✂️") ||
        (eleccionUsuario === "tijera ✂️" && eleccionPC === "papel 📋") ||
        (eleccionUsuario === "papel 📋" && eleccionPC === "piedra 🪨")
    ) {
        ganaUsuario();
    } 
    else if (
        (eleccionPC === "piedra 🪨" && eleccionUsuario === "tijera ✂️") ||
        (eleccionPC === "tijera ✂️" && eleccionUsuario === "papel 📋") ||
        (eleccionPC === "papel 📋" && eleccionUsuario === "piedra 🪨")
    ) {
        ganaPC();
    } 
    else {
        empate();
    }

    mensaje.classList.remove("disabled");
    contenedorEleccionUsuario.innerText = eleccionUsuario;
    contenedorEleccionPC.innerText = eleccionPC;

    // se chequea el ganador (primero en hacer 3 puntos), 
    // oculta la posibilidad de elegir el arma, 
    // muestra el boton reiniciar e invoca la funcion para reiniciar
    if (puntosUsuario === 3 || puntosPC === 3) {

        if (puntosUsuario === 3) {
            instrucciones.innerText = "🔥 ¡Ganaste el juego! 🔥"
        }

        if (puntosPC === 3) {
            instrucciones.innerText = "😭 ¡La computadora ganó el juego! 😭"
        }

        elegiTuArma.classList.add("disabled");
        reiniciar.classList.remove("disabled");
        reiniciar.addEventListener("click", reiniciarJuego);
    }


}
// incrementa en uno los puntos del usuario y lo anuncia
function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = "¡Ganaste un punto! 🔥"
}
// incrementa en uno los puntos de la PC y lo anuncia
function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "¡La computadora ganó un punto! 😭"
}
// anuncia el empate de la ronda
function empate() {
    contenedorGanaPunto.innerText = "¡Empate! 😱"
}
/* uculta el boton reiniciar,
   muestra las armas a elegir y
   muestra el mensaje de la selecciones de usuario y PC */
function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    elegiTuArma.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;

    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;

    instrucciones.innerText = "El mejor de 5 gana."
}