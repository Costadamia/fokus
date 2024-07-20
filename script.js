const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
console.log(botones);
const enfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonComenzar = document.querySelector('#start-pause');
const textoComenzar = document.querySelector('#start-pause span');
const tiempoPantalla = document.querySelector('#timer');
let cronometro = null; 
let idIntervalo = null;
const sonidoFinalizar = new Audio('./sonidos/beep.mp3');
const sonidoIniciar = new Audio('./sonidos/play.wav');
const sonidoPausar = new Audio('./sonidos/pause.mp3');


musica.loop = true; 

enfoqueMusica.addEventListener('change', () =>{
    if (musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

botonCorto.addEventListener('click', () => {
    cronometro = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () => {
    cronometro = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
})

botonLargo.addEventListener('click', () => {
    cronometro = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');

})

function cambiarContexto(contexto) {
    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro? <strong class="app__title-strong">Haz una pausa corta!</strong> `
            break
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie <strong class="app__title-strong">Haz una pausa larga!</strong> `
            break
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if (cronometro <= 0) {
        sonidoFinalizar.play();
        alert('Tiempo terminado');
        reiniciar();
        return;
    }
    textoComenzar.textContent = "Pausar";
    cronometro -= 1;
    console.log(cronometro);
    console.log('ID: ' + idIntervalo);
    mostrarTiempo();
}

botonComenzar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) {
        sonidoPausar.play();
        reiniciar()
        return;
    }
    sonidoIniciar.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoComenzar.textContent = "Comenzar";
}

function mostrarTiempo() {
    const tiempo = new Date(cronometro * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'})
    tiempoPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();

