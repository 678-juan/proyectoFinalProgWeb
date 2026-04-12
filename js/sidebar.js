document.addEventListener("DOMContentLoaded", function() {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const paginaActual = window.location.pathname || "";

    const pasos = [
        { nombre: "Datos Personales", url: "datos-personales.html", icono: "fa-solid fa-user" },
        { nombre: "Formación Académica", url: "formacion-academica.html", icono: "fa-solid fa-graduation-cap" },
        { nombre: "Experiencia Laboral", url: "experiencia-laboral.html", icono: "fa-solid fa-briefcase" },
        { nombre: "Tiempo de Experiencia", url: "tiempo-experiencia.html", icono: "fa-solid fa-clock" },
        { nombre: "Certificación", url: "certificacion.html", icono: "fa-solid fa-certificate" }
    ];

    let itemsPasos = pasos.map(function(paso) {
        const esActual = paginaActual ? paginaActual.includes(paso.url) : false;
        const claseActual = esActual ? "sidebar-item activo" : "sidebar-item";

        return `
            <li class="${claseActual}">
                <a href="${paso.url}">
                    <i class="${paso.icono} sidebar-icono"></i>
                    <span class="sidebar-nombre">${paso.nombre}</span>
                </a>
            </li>
        `;
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

function cerrarSesionSidebar() {
    localStorage.removeItem("sesion");
    window.location.href = "../index.html";
}