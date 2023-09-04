document.addEventListener("DOMContentLoaded", function () {
    const preguntaInput = document.getElementById("pregunta");
    const categoriaSelect = document.getElementById("categoria");
    const enviarPreguntaBtn = document.getElementById("enviarPregunta");
    const respuestasDiv = document.getElementById("respuestas");

    enviarPreguntaBtn.addEventListener("click", function () {
        const pregunta = preguntaInput.value.trim();
        const categoria = categoriaSelect.value;

        if (pregunta !== "") {
            enviarPregunta(pregunta, categoria);
            preguntaInput.value = "";
        }
    });

    function enviarPregunta(pregunta, categoria) {
        // Simulación de solicitud Fetch a un servicio de preguntas y respuestas
        // En una aplicación real, esto se conectaría a una API o servidor
        const respuesta = obtenerRespuestaAleatoria(categoria);

        // Almacenar la pregunta y la respuesta en localStorage
        almacenarPreguntaRespuesta(pregunta, respuesta);

        mostrarRespuesta(respuesta);
    }

    function obtenerRespuestaAleatoria(categoria) {
        const respuestasPorCategoria = {
            Salud: [
                "Es importante consultar a un profesional de la salud.",
                "Puede ser útil hacer ejercicio regularmente.",
                "La dieta equilibrada es clave para una buena salud.",
            ],
            Finanzas: [
                "Ahorra al menos un 20% de tus ingresos.",
                "Evita las deudas innecesarias.",
                "Invierte tu dinero sabiamente.",
            ],
            Relaciones: [
                "La comunicación abierta es esencial en las relaciones.",
                "Escucha activamente a tu pareja.",
                "Resuelve los conflictos de manera constructiva.",
            ],
            Carrera: [
                "Define tus metas profesionales a corto y largo plazo.",
                "Aprende nuevas habilidades constantemente.",
                "Networking es importante en el desarrollo profesional.",
            ],
            Tecnología: [
                "Mantén tu software actualizado para la seguridad.",
                "Protege tus contraseñas y datos personales.",
                "Aprende sobre nuevas tecnologías y tendencias.",
            ],
        };

        const respuestas = respuestasPorCategoria[categoria];
        const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];

        return respuestaAleatoria;
    }

    function mostrarRespuesta(respuesta) {
        const respuestaElemento = document.createElement("div");
        respuestaElemento.classList.add("response");
        respuestaElemento.textContent = respuesta;
        respuestasDiv.appendChild(respuestaElemento);
    }

    function almacenarPreguntaRespuesta(pregunta, respuesta) {
        // Obtener preguntas y respuestas existentes desde localStorage
        const preguntasRespuestasGuardadas = JSON.parse(localStorage.getItem("preguntasRespuestas")) || [];

        // Agregar la nueva pregunta y respuesta al arreglo
        preguntasRespuestasGuardadas.push({ pregunta, respuesta });

        // Almacenar el arreglo actualizado en localStorage
        localStorage.setItem("preguntasRespuestas", JSON.stringify(preguntasRespuestasGuardadas));
    }

    function cargarPreguntasRespuestasGuardadas() {
        // Obtener preguntas y respuestas desde localStorage
        const preguntasRespuestasGuardadas = JSON.parse(localStorage.getItem("preguntasRespuestas")) || [];

        // Mostrar preguntas y respuestas en la página
        preguntasRespuestasGuardadas.forEach(function (item) {
            mostrarRespuesta(`Pregunta: ${item.pregunta}, Respuesta: ${item.respuesta}`);
        });
    }

    // Cargar las preguntas y respuestas almacenadas al cargar la página
    cargarPreguntasRespuestasGuardadas();
});