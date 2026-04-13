document.addEventListener("DOMContentLoaded", function () {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const paginaActual = window.location.pathname || "";

    const pasos = [
        {
            nombre: "Datos Personales",
            url: "datos-personales.html",
            icono: "fa-solid fa-user",
            requiere: null,
            guarda: "datosPersonales"
        },
        {
            nombre: "Formación Académica",
            url: "formacion-academica.html",
            icono: "fa-solid fa-graduation-cap",
            requiere: "datosPersonales",
            guarda: "formacionAcademica"
        },
        {
            nombre: "Experiencia Laboral",
            url: "experiencia-laboral.html",
            icono: "fa-solid fa-briefcase",
            requiere: "formacionAcademica",
            guarda: "experienciaLaboral"
        },
        {
            nombre: "Tiempo de Experiencia",
            url: "tiempo-experiencia.html",
            icono: "fa-solid fa-clock",
            requiere: "experienciaLaboral",
            guarda: "tiempoExperiencia"
        },
        {
            nombre: "Certificación",
            url: "certificacion.html",
            icono: "fa-solid fa-certificate",
            requiere: "tiempoExperiencia",
            guarda: null
        }
    ];

    let itemsPasos = pasos.map(function (paso) {
        const esActual = paginaActual ? paginaActual.includes(paso.url) : false;
        const claseActual = esActual ? "sidebar-item activo" : "sidebar-item";

        const requisitoOk = paso.requiere === null || localStorage.getItem(paso.requiere) !== null;
        const yaCompletada = paso.guarda !== null && localStorage.getItem(paso.guarda) !== null;

        // Disponible solo si es la actual O si no ha sido completada aún pero tiene requisito
        const disponible = esActual || (requisitoOk && !yaCompletada);

        if (disponible) {
            return `
                <li class="${claseActual}">
                    <a href="${paso.url}">
                        <i class="${paso.icono} sidebar-icono"></i>
                        <span class="sidebar-nombre">${paso.nombre}</span>
                        ${yaCompletada ? '<i class="fa-solid fa-check sidebar-check"></i>' : ""}
                    </a>
                </li>
            `;
        } else {
            return `
                <li class="sidebar-item bloqueado" onclick="mostrarBloqueo()">
                    <a href="#" onclick="return false;">
                        <i class="${paso.icono} sidebar-icono"></i>
                        <span class="sidebar-nombre">${paso.nombre}</span>
                        <i class="fa-solid fa-lock sidebar-lock"></i>
                    </a>
                </li>
            `;
        }
    }).join("");

    const nombreUsuario = sesion ? sesion.username : "Invitado";
    const rolUsuario = sesion ? sesion.rol : "";

    document.getElementById("sidebar").innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-titulo">Hoja de Vida</h2>
                <p class="sidebar-subtitulo">Formato Único DAFP</p>
            </div>

            <div class="sidebar-usuario">
                <div class="sidebar-avatar">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div>
                    <p class="sidebar-nombreusuario">${nombreUsuario}</p>
                    <p class="sidebar-rol">${rolUsuario}</p>
                </div>
            </div>

            <ul class="sidebar-lista">
                ${itemsPasos}
            </ul>

            <div class="sidebar-footer">
                <button class="sidebar-logout" onclick="cerrarSesionSidebar()">
                    <i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
                </button>
            </div>
        </aside>
    `;
});

function mostrarBloqueo() {
    alert("Debes completar la sección anterior antes de continuar.");
}

function cerrarSesionSidebar() {
    localStorage.removeItem("sesion");
    window.location.href = "../index.html";
}