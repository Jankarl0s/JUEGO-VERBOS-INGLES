document.addEventListener("DOMContentLoaded", function() {
    const scoreDisplay = document.getElementById("score-value");
    const translationInput = document.getElementById("translation");
    const startButton = document.getElementById("start-button");
    const verbContainer = document.getElementById("verb-container");
    const timerDisplay = document.getElementById("timer"); // Obtener el elemento del temporizador
    const backgroundMusic = new Audio("C:/Users/janca/OneDrive/Documentos/ICEP/PROYECTOS/TYPING/audio/musica.m4a"); // Agregar música de fondo
    const translations = {
        "SER/ESTAR":"be",
        "TENER":"have",
        "HACER":"do",
        "DECIR":"say",
        "CONSEGUIR":"get",
        "EL VERBO HACER QUE NO ES DO":"make",
        "IR":"go",
        "SABER":"know",
        "TOMAR":"take",
        "VER":"see",
        "VENIR":"come",
        "PENSAR":"think",
        "MIRAR":"look",
        "QUERER":"want",
        "DAR":"give",
        "USAR":"use",
        "ENCONTRAR":"find",
        "CONTAR A ALGUIEN":"tell",
        "PREGUNTAR":"ask",
        "TRABAJAR":"work",
        "PARECER":"seem",
        "SENTIR":"feel",
        "INTENTAR":"try",
        "DEJAR":"leave",
        "LLAMAR":"call",
        "DEBER":"should",
        "NECESITAR":"need",
        "LLEGAR A SER":"become",
        "SIGNIFICAR":"mean",
        "SALIR":"leave",
        "PONER":"put",
        "APRENDER":"learn",
        "CAMBIAR":"change",
        "VIVIR":"live",
        "JUGAR":"play",
        "CRECER":"grow",
        "CREER":"believe",
        "TRAER":"bring",
        "EMPEZAR":"begin",
        "MANTENER":"keep",
        "SOSTENER":"hold",
        "ESCRIBIR":"write",
        "ESTAR DE PIE":"stand",
        "ESCUCHAR":"hear",
        "DEJAR":"let",
        "SIGNIFICAR":"mean",
        "ESTABLECER":"set",
        "ENCONTRARSE CON":"meet",
        "PAGAR":"pay",
        "SENTARSE":"sit",
        "HABLAR":"speak",
        "LEER":"read",
        "PERMITIR":"allow",
        "AÑADIR":"add",
        "GASTAR":"spend",
        "COMPRAR":"buy",
        "CORTAR":"cut",
        "CONSTRUIR":"build",
        "SUCEDER":"happen",
        "OFRECER":"offer",
        "RECORDAR":"remember",
        "CONSIDERAR":"consider",
        "APARECER":"appear",
        "SERVIR":"serve",
        "MORIR":"die",
        "ENVIAR":"send",
        "ESPERAR QUE NO ES WAIT NI HOPE":"expect",
        "EXPLICAR":"explain",
        "ESPERAR QUE NO ES WAIT":"hope",
        "INCLUIR":"include",
        "CREAR":"create",
        "ESTAR DE ACUERDO":"agree",
        "SEGUIR":"follow",
        "ENTENDER":"understand",
        "MANEJAR":"manage",
        "MOVER":"move",
        "CONTINUAR":"continue",
        "MANTENER":"hold",
        "MIRAR":"watch",
        "UNIRSE":"join",
        "RELACIONAR":"relate",
        "COMPARAR":"compare",
        "ANUNCIAR":"announce",
        "CAMINAR":"walk",
        "ESPERAR":"wait",
        "ALCANZAR":"reach",
        "ATRAPAR":"catch",
        "QUEDARSE":"stay",
        "ESTAR DE PIE":"stand",
        "PROBAR":"prove",
        "CAER":"fall",
        "MOSTRAR":"show",
        "CORTAR":"cut",
        "VOLVER":"return",
        "ROMPER":"break",
        "DESARROLLAR":"develop",
        "GRABAR":"record",
        "RECOGER":"pick",
        "LLEVAR PUESTO":"wear" 
    };
    let score = 0;
    let unansweredVerbs = 0;
    let verbInterval;
    let timerInterval; // Variable para almacenar el intervalo del temporizador
    let timeLeft = 0; // Tiempo en segundos

    // Asignar el evento click al botón de inicio del juego
    startButton.addEventListener("click", startGame);

    // Función para iniciar el juego
    function startGame() {
        startButton.style.display = "none";
        backgroundMusic.play(); // Reproducir la música de fondo
        startTimer(); // Iniciar el contador de tiempo
        generateVerb();
        verbInterval = setInterval(generateVerb, 3000);
    }

    // Función para generar un nuevo verbo con su icono
    function generateVerb() {
        const verbs = Object.keys(translations);
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        const verbElement = document.createElement("div");
        verbElement.classList.add("verb");
        verbElement.textContent = randomVerb;

        // Obtener la traducción del verbo y asignarla como valor de data-translation
        const translation = translations[randomVerb];
        verbElement.setAttribute("data-translation", translation);

        // Crear el icono y agregarlo junto al verbo
        const icon = document.createElement("img");
        icon.src = "img/hijo.png";
        icon.alt = "Icono de hijo";
        icon.classList.add("icon");
        verbElement.appendChild(icon);

        verbContainer.appendChild(verbElement);

        // Incrementar el contador de verbos sin contestar
        unansweredVerbs++;

        // Actualizar el texto de la casilla de respuesta
        translationInput.placeholder = "Dime el verbo en inglés";

        checkGameOver();
    }

    // Función para iniciar el contador de tiempo
    function startTimer() {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        timerInterval = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            timerDisplay.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }, 1000);
    }

    // Manejar la pulsación de la tecla "Enter" para ingresar la traducción
    translationInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const userInput = translationInput.value.trim().toLowerCase();
            const verbs = document.querySelectorAll(".verb");
            verbs.forEach(verb => {
                const translation = verb.getAttribute("data-translation");
                if (userInput === translation) {
                    score++;
                    scoreDisplay.textContent = score;
                    verb.remove();
                    translationInput.value = ""; // Limpiar la casilla de respuesta
                    unansweredVerbs--;

                    // Reproducir el sonido de la explosión
                    const explosionSound = document.getElementById("explosion-sound");
                    explosionSound.play(); // Esta línea reproduce el sonido
                }
            });
            checkGameOver();
        }
    });

    function checkGameOver() {
        if (unansweredVerbs >= 20) {
            clearInterval(verbInterval); // Detener la generación de nuevos verbos
            clearInterval(timerInterval); // Detener el contador de tiempo
            backgroundMusic.pause(); // Pausar la música de fondo
            alert("¡Perdiste, eres una verguenza para los Sayayin!");
    
            // Reproducir el audio de finalización del juego
            const finalSound = new Audio("C:/Users/janca/OneDrive/Documentos/ICEP/PROYECTOS/TYPING/audio/final.mp3");
            finalSound.play(); // Esta línea reproduce el audio de finalización
        } else if (score >= 50) {
            clearInterval(verbInterval); // Detener la generación de nuevos verbos
            clearInterval(timerInterval); // Detener el contador de tiempo
            backgroundMusic.pause(); // Pausar la música de fondo
            alert("¡Felicidades, contestaste 50 verbos correctamente, tu si puedes salvar el mundo!");
    
            // Reproducir el audio de victoria
            const winSound = new Audio("C:/Users/janca/OneDrive/Documentos/ICEP/PROYECTOS/TYPING/audio/win.mp3");
            winSound.play(); // Esta línea reproduce el audio de victoria
        }
    }
});