document.addEventListener("DOMContentLoaded", function() {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const paginaActual = window.location.pathname || "";

    const pasos = [{ nombre: "Datos Personales", url: "datos-personales.html", icono: "👤" },
        { nombre: "Formación Académica", url: "formacion-academica.html", icono: "🎓" },
        { nombre: "Experiencia Laboral", url: "experiencia-laboral.html", icono: "💼" },
        { nombre: "Tiempo de Experiencia", url: "tiempo-experiencia.html", icono: "⏱" },
        { nombre: "Certificación", url: "certificacion.html", icono: "✅" }]

        //Construccion de items del sidebar
        let itemsPasos = pasos.map(function(paso){
            const esActual = paginaActual ? paginaActual.includes(paso.url) : false;
            const claseActual = esActual ? "sidebar-item-activo" : "sidebar-item";
            return `
            <li class="${claseActual}">
                <a href="${paso.url}">
                    <span class="sidebar-icono">${paso.icono}</span>
                    <span class="sidebar-nombre">${paso.nombre}</span>
                </a>
            </li>
        `;
        }).join("");

        //Nombre del usuario
        const nombreUsuario = sesion ? sesion.nombre : "Invitado";
        const rolUsuario = sesion ? sesion.rol : "";

        document.getElementById("sidebar").innerHTML = `
        <aside class="sidebar">

            <div class="sidebar-header">
                <h2 class="sidebar-titulo">Hoja de Vida</h2>
                <p class="sidebar-subtitulo">Formato Único DAFP</p>
            </div>

            <div class="sidebar-usuario">
                <span class="sidebar-avatar">👤</span>
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
                    🚪 Cerrar Sesión
                </button>
            </div>

        </aside>
    `;
});

function cerrarSesionSidebar() {
    localStorage.removeItem("sesion");
    window.location.href = "../index.html";
}