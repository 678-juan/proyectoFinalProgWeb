// ============================================
// admin.js
// ============================================

let hojaSeleccionadaId = null;

document.addEventListener("DOMContentLoaded", function() {
    verificarAdmin();
    filtrarHojas();
});

// Verifica que quien entra sea admin
function verificarAdmin() {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (!sesion || sesion.rol !== "administrador") {
        alert("Acceso denegado");
        window.location.href = "../index.html";
    }
}

// Filtra y muestra las hojas según el estado seleccionado
function filtrarHojas() {
    const filtro = document.getElementById("filtroEstado").value;
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];

    // Filtra según el estado
    const hojasFiltradas = filtro === "TODAS"
        ? hojas
        : hojas.filter(function(h) { return h.estado === filtro; });

    const contenedor = document.getElementById("contenidoLista");

    if (hojasFiltradas.length === 0) {
        contenedor.innerHTML = "<p>No hay hojas de vida para mostrar.</p>";
        return;
    }

    // Construye la tabla
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha Envío</th>
                    <th>Inhabilitado</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    hojasFiltradas.forEach(function(hoja) {
        let colorEstado = "";
        if (hoja.estado === "Aceptada") colorEstado = "green";
        else if (hoja.estado === "Rechazada") colorEstado = "red";
        else colorEstado = "orange";

        html += `
            <tr>
                <td>${hoja.nombreFirma}</td>
                <td>${hoja.fechaEnvio}</td>
                <td>${hoja.inhabilitado}</td>
                <td style="color:${colorEstado}; font-weight:bold">${hoja.estado}</td>
                <td>
                    <button onclick="verDetalle(${hoja.id})">Ver</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    contenedor.innerHTML = html;
}

// Muestra el detalle de una hoja específica
function verDetalle(id) {
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];
    const hoja = hojas.find(function(h) { return h.id === id; });

    if (!hoja) return;

    hojaSeleccionadaId = id;

    const dp = hoja.datosPersonales;
    const fa = hoja.formacionAcademica;
    const exp = hoja.experienciaLaboral;
    const te = hoja.tiempoExperiencia;

    // Estudios
    let htmlEstudios = (fa.estudios && fa.estudios.length > 0)
        ? fa.estudios.map(function(e) {
            return `<p>• ${e.nombreEstudio} — ${e.modalidad} — Graduado: ${e.graduado}</p>`;
        }).join("")
        : "<p>Sin estudios superiores</p>";

    // Experiencias
    let htmlExperiencias = (exp && exp.length > 0)
        ? exp.map(function(e) {
            return `<p>• ${e.empresa} — ${e.cargo} — Ingreso: ${e.fechaIngreso}</p>`;
        }).join("")
        : "<p>Sin experiencia laboral</p>";

    document.getElementById("contenidoDetalle").innerHTML = `
        <h3>Datos Personales</h3>
        <p><strong>Nombre:</strong> ${dp.nombres} ${dp.primerApellido} ${dp.segundoApellido || ""}</p>
        <p><strong>Documento:</strong> ${dp.tipoDocumento} ${dp.numeroDocumento}</p>
        <p><strong>Teléfono:</strong> ${dp.telefono}</p>
        <p><strong>Email:</strong> ${dp.email || "No especificado"}</p>

        <h3>Formación Académica</h3>
        <p><strong>Último grado:</strong> ${fa.ultimoGrado || "No especificado"}</p>
        ${htmlEstudios}

        <h3>Experiencia Laboral</h3>
        ${htmlExperiencias}

        <h3>Tiempo Total de Experiencia</h3>
        <p><strong>Total:</strong> ${te.totalAnios} años, ${te.totalMeses} meses</p>

        <h3>Certificación</h3>
        <p><strong>Inhabilitado:</strong> ${hoja.inhabilitado}</p>
        <p><strong>Estado actual:</strong> ${hoja.estado}</p>
        <p><strong>Observaciones:</strong> ${hoja.observaciones || "Sin observaciones"}</p>
    `;

    // Precarga el estado actual en el select
    document.getElementById("nuevoEstado").value = hoja.estado;
    document.getElementById("observaciones").value = hoja.observaciones || "";

    document.getElementById("listaHojas").style.display = "none";
    document.getElementById("filtros").style.display = "none";
    document.getElementById("detalleHoja").style.display = "block";
}

// Guarda el nuevo estado y observaciones
function guardarCambios() {
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];
    const nuevoEstado = document.getElementById("nuevoEstado").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    // Encuentra la hoja y actualiza
    const hojas_actualizadas = hojas.map(function(h) {
        if (h.id === hojaSeleccionadaId) {
            h.estado = nuevoEstado;
            h.observaciones = observaciones;
        }
        return h;
    });

    localStorage.setItem("hojasDeVida", JSON.stringify(hojas_actualizadas));
    document.getElementById("mensajeAdmin").textContent = "✅ Cambios guardados correctamente";
}

function volverLista() {
    hojaSeleccionadaId = null;
    document.getElementById("detalleHoja").style.display = "none";
    document.getElementById("filtros").style.display = "block";
    document.getElementById("listaHojas").style.display = "block";
    filtrarHojas();
}

function cerrarSesion() {
    localStorage.removeItem("sesion");
    window.location.href = "../index.html";
}