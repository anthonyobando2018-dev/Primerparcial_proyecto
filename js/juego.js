
/* ==========================================
   1. SELECCIONAR LOS ELEMENTOS DEL HTML
========================================== */
// Filtros de año
const filtrosAnio = document.querySelectorAll('input[name="anio"]');
// Lista desplegable de categorías
const filtroCategoria = document.querySelector("#categoria");
// Todas las tarjetas de videojuegos
const juegos = document.querySelectorAll(".juego");
/* ==========================================
   2. CARGAR LAS CATEGORÍAS AUTOMÁTICAMENTE
========================================== */
function cargarCategorias() {
    // Guardamos las categorías sin repetirlas
    const categorias = new Map();
    juegos.forEach((juego) => {
        // Código de categoría del videojuego
        const codigo = juego.dataset.cat;
        // Nombre visible que está dentro de la tarjeta
        const nombreElemento = juego.querySelector(".chips .chip:not(.anio)");
        if (codigo && nombreElemento) {
            const nombre = nombreElemento.textContent.trim();
            categorias.set(codigo, nombre);
        }
    });
    // Reiniciar la lista desplegable
    filtroCategoria.innerHTML =
        '<option value="todas">Todas las categorías</option>';
    // Crear una opción por cada categoría encontrada
    categorias.forEach((nombre, codigo) => {
        const opcion = document.createElement("option");
        opcion.value = codigo;
        opcion.textContent = nombre;
        filtroCategoria.appendChild(opcion);
    });
}
/* ==========================================
   3. FILTRAR LOS VIDEOJUEGOS
========================================== */
function filtrarJuegos() {
    // Obtener el año seleccionado
    const anioSeleccionado = document.querySelector(
        'input[name="anio"]:checked'
    ).value;
    // Obtener la categoría seleccionada
    const categoriaSeleccionada = filtroCategoria.value;
    juegos.forEach((juego) => {
        // Leer los datos de cada tarjeta
        const anioJuego = juego.dataset.anio;
        const categoriaJuego = juego.dataset.cat;
        // Comprobar si coincide el año
        const coincideAnio =
            anioSeleccionado === "todos" ||
            anioJuego === anioSeleccionado;
        // Comprobar si coincide la categoría
        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            categoriaJuego === categoriaSeleccionada;
        // Mostrar solamente los juegos que coincidan
        if (coincideAnio && coincideCategoria) {
            juego.style.display = "";
        } else {
            juego.style.display = "none";
        }
    });
    actualizarBotones();
}
/* ==========================================
   4. CAMBIAR EL ESTILO DEL AÑO SELECCIONADO
========================================== */
function actualizarBotones() {
    filtrosAnio.forEach((radio) => {
        const etiqueta = document.querySelector(
            `label[for="${radio.id}"]`
        );
        if (etiqueta) {
            etiqueta.classList.toggle("activo", radio.checked);
        }
    });
}
/* ==========================================
   5. ELEMENTOS DEL MODAL
========================================== */
const modal = document.querySelector("#modalJuego");
const botonCerrar = document.querySelector("#cerrarModal");

const modalImagen = document.querySelector("#modalImagen");
const modalTitulo = document.querySelector("#modalTitulo");
const modalDescripcion = document.querySelector("#modalDescripcion");
// Botones de enlaces externos
const modalWeb = document.querySelector("#modalWeb");
const modalSteam = document.querySelector("#modalSteam");
const modalGoty = document.querySelector("#modalGoty");

const modalCategoria = document.querySelector("#modalCategoria");
const modalAnio = document.querySelector("#modalAnio");
const modalFecha = document.querySelector("#modalFecha");

const modalCategoriaDato = document.querySelector("#modalCategoriaDato");
const modalAnioDato = document.querySelector("#modalAnioDato");
const modalEstudio = document.querySelector("#modalEstudio");
const modalPlataformas = document.querySelector("#modalPlataformas");
const modalPremios = document.querySelector("#modalPremios");

const modalTrailer = document.querySelector("#modalTrailer");
const trailerMensaje = document.querySelector("#trailerMensaje");




let tarjetaAnterior = null;
/* ==========================================
   6. ABRIR EL MODAL
========================================== */
function abrirModal(juego) {
    // Guardar la tarjeta desde la que abrimos el modal
    tarjetaAnterior = juego;
    // Leer la información de la tarjeta
    const datos = juego.dataset;
    // Colocar la información en el modal
    modalTitulo.textContent = datos.titulo;
    modalDescripcion.textContent = datos.descripcion;
    // Colocar los enlaces correspondientes al videojuego
    modalWeb.href = datos.web || "#";
    modalSteam.href = datos.steam || "#";
    modalGoty.href = datos.goty || "#";
    // Ocultar los botones que no tengan enlaces
    modalWeb.hidden = !datos.web;
    modalSteam.hidden = !datos.steam;
    modalGoty.hidden = !datos.goty;



    modalCategoria.textContent =
        juego.querySelector(".chips .chip:not(.anio)").textContent;

    modalAnio.textContent = datos.anio;
    modalFecha.textContent = datos.fecha || "Fecha no disponible";

    modalCategoriaDato.textContent = modalCategoria.textContent;
    modalAnioDato.textContent = datos.anio;
    modalEstudio.textContent = datos.estudio || "No especificado";
    modalPlataformas.textContent = datos.plataformas || "No especificadas";
    modalPremios.textContent = datos.premios || "Sin información";
    // Colocar la imagen horizontal
    modalImagen.src = datos.imagen;
    modalImagen.alt = "Imagen de " + datos.titulo;
    // Comprobar si el videojuego tiene tráiler
    if (datos.trailer) {

        modalTrailer.src = datos.trailer;
        trailerMensaje.style.display = "none";
    } else {
        modalTrailer.src = "";
        trailerMensaje.style.display = "block";
        trailerMensaje.textContent =
            "El tráiler de este videojuego todavía no está disponible.";
    }
    // Mostrar la ventana
    modal.hidden = false;
    // Evitar que la página se desplace detrás del modal
    document.body.style.overflow = "hidden";
    // Llevar el foco al botón de cerrar
    botonCerrar.focus();
}
/* ==========================================
   7. CERRAR EL MODAL
========================================= */
function cerrarModal() {
    modal.hidden = true;
    // Detener el video al cerrar la ventana
    modalTrailer.src = "";
    // Recuperar el desplazamiento normal de la página
    document.body.style.overflow = "";
    // Devolver el foco a la tarjeta anterior
    if (tarjetaAnterior) {
        tarjetaAnterior.focus();
    }
}
/* ==========================================
   8. DETECTAR CLICS EN LAS TARJETAS
========================================== */
juegos.forEach((juego) => {
    // Abrir el modal al seleccionar una tarjeta
    juego.addEventListener("click", (evento) => {
        // Evitar que los enlaces lleven a otra página
        if (evento.target.closest("a")) {
            evento.preventDefault();
        }
        abrirModal(juego);
    });
    // Permitir abrir la tarjeta con Enter o espacio
    juego.addEventListener("keydown", (evento) => {
        if (
            (evento.key === "Enter" || evento.key === " ") &&
            evento.target === juego
        ) {
            evento.preventDefault();
            abrirModal(juego);
        }
    });
});
/* ==========================================
   9. EVENTOS PARA CERRAR EL MODAL
========================================= */
// Cerrar con el botón X
botonCerrar.addEventListener("click", cerrarModal);
// Cerrar al pulsar fuera de la ventana
modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        cerrarModal();
    }
});
// Cerrar con la tecla Escape
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !modal.hidden) {
        cerrarModal();
    }
});
/* ==========================================
   10. ACTIVAR LOS FILTROS
========================================== */
// Escuchar cambios en los años
filtrosAnio.forEach((radio) => {
    radio.addEventListener("change", filtrarJuegos);
});
// Escuchar cambios en las categorías
filtroCategoria.addEventListener("change", filtrarJuegos);
/* ==========================================
   11. INICIAR EL CATÁLOGO
========================================== */
// Cargar las categorías que existen en las tarjetas
cargarCategorias();
// Aplicar los filtros iniciales (2020 y todas las categorías)
filtrarJuegos();
