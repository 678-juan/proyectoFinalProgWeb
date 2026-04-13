let contadorEstudios = 0;
let contadorIdiomas = 0;

document.addEventListener("DOMContentLoaded", function() {
    const datosPersonales = JSON.parse(localStorage.getItem("datosPersonales"));
    if (!datosPersonales || !datosPersonales.nombres) {
        alert("Por favor completa tus datos personales antes de continuar con la formación académica.");
        window.location.href = "datos-personales.html";
        return;
    }

    document.getElementById("listaEstudios").addEventListener("input", function(e) {
        if (e.target.id && e.target.id.startsWith("nombreEstudio-")) {
            e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        }
        if (e.target.id && e.target.id.startsWith("tarjeta-")) {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
        }
    });

    document.getElementById("ultimoGrado").addEventListener("change", function() {
        const seccionMes = document.getElementById("seccionMesGrado");
        const seccionAnio = document.getElementById("seccionAnioGrado");
        const seccionSuperior = document.getElementById("seccionSuperior");

        if (this.value == 11) {
            seccionMes.style.display = "block";
            seccionAnio.style.display = "block";
            seccionSuperior.style.display = "block";
        } else {
            seccionMes.style.display = "none";
            seccionAnio.style.display = "none";
            seccionSuperior.style.display = "none";
            document.getElementById("mesGrado").value = "";
            document.getElementById("anioGrado").value = "";
        }
    });

    cargarGrados();
    cargarAnios("anioGrado");
});

function cargarGrados() {
    const select = document.getElementById("ultimoGrado");
    select.innerHTML = '<option value="">-- Seleccione --</option>';
    for (let i = 1; i <= 11; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = "Grado " + i;
        select.appendChild(option);
    }
}

function cargarAnios(idSelect) {
    const select = document.getElementById(idSelect);
    const anioActual = new Date().getFullYear();
    select.innerHTML = '<option value="">-- Seleccione --</option>';
    for (let anio = anioActual; anio >= 1950; anio--) {
        const option = document.createElement("option");
        option.value = anio;
        option.textContent = anio;
        select.appendChild(option);
    }
}

function agregarEstudio() {
    contadorEstudios++;
    const id = contadorEstudios;
    const contenedor = document.getElementById("listaEstudios");

    const div = document.createElement("div");
    div.classList.add("bloque-estudio");
    div.id = "estudio-" + id;

    let opcionesModalidad = '<option value="">-- Seleccione --</option>';
    modalidadesAcademicas.forEach(function(m) {
        opcionesModalidad += `<option value="${m.codigo}">${m.nombre}</option>`;
    });

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let opcionesMeses = '<option value="">-- Seleccione --</option>';
    meses.forEach(function(mes, i) {
        opcionesMeses += `<option value="${i + 1}">${mes}</option>`;
    });

    const anioActual = new Date().getFullYear();
    let opcionesAnios = '<option value="">-- Seleccione --</option>';
    for (let anio = anioActual; anio >= 1950; anio--) {
        opcionesAnios += `<option value="${anio}">${anio}</option>`;
    }

    div.innerHTML = `
        <h4>Estudio #${id}</h4>

        <div class="campo">
            <label>Modalidad Académica *</label>
            <select id="modalidad-${id}">${opcionesModalidad}</select>
        </div>

        <div class="campo">
            <label>Número de Semestres Aprobados *</label>
            <select id="semestres-${id}">
                <option value="">-- Seleccione --</option>
                ${Array.from({length: 12}, function(_, i) {
                    return `<option value="${i + 1}">${i + 1} semestre${i > 0 ? "s" : ""}</option>`;
                }).join("")}
            </select>
        </div>

        <div class="campo">
            <label>Graduado *</label>
            <label><input type="radio" name="graduado-${id}" value="SI"> Sí</label>
            <label><input type="radio" name="graduado-${id}" value="NO"> No</label>
        </div>

        <div class="campo">
            <label>Nombre del Estudio o Título Obtenido *</label>
            <input type="text" id="nombreEstudio-${id}">
        </div>

        <div class="campo">
            <label>Mes de Terminación *</label>
            <select id="mesTerminacion-${id}">${opcionesMeses}</select>
        </div>

        <div class="campo">
            <label>Año de Terminación *</label>
            <select id="anioTerminacion-${id}">${opcionesAnios}</select>
        </div>

        <div class="campo">
            <label>No. Tarjeta Profesional</label>
            <input type="text" id="tarjeta-${id}" placeholder="Solo números">
        </div>

        <button onclick="eliminarBloque('estudio-${id}')">🗑 Eliminar</button>
        <hr>
    `;

    contenedor.appendChild(div);
}

function agregarIdioma() {
    contadorIdiomas++;
    const id = contadorIdiomas;
    const contenedor = document.getElementById("listaIdiomas");

    const div = document.createElement("div");
    div.classList.add("bloque-idioma");
    div.id = "idioma-" + id;

    let opcionesIdioma = '<option value="">-- Seleccione --</option>';
    idiomas.forEach(function(idioma) {
        opcionesIdioma += `<option value="${idioma}">${idioma}</option>`;
    });

    div.innerHTML = `
        <h4>Idioma #${id}</h4>

        <div class="campo">
            <label>Idioma *</label>
            <select id="selectIdioma-${id}">${opcionesIdioma}</select>
        </div>

        <div class="campo">
            <label>Lo Habla</label>
            <select id="habla-${id}">
                <option value="">--</option>
                <option value="R">Regular</option>
                <option value="B">Bien</option>
                <option value="MB">Muy Bien</option>
            </select>
        </div>

        <div class="campo">
            <label>Lo Lee</label>
            <select id="lee-${id}">
                <option value="">--</option>
                <option value="R">Regular</option>
                <option value="B">Bien</option>
                <option value="MB">Muy Bien</option>
            </select>
        </div>

        <div class="campo">
            <label>Lo Escribe</label>
            <select id="escribe-${id}">
                <option value="">--</option>
                <option value="R">Regular</option>
                <option value="B">Bien</option>
                <option value="MB">Muy Bien</option>
            </select>
        </div>

        <button onclick="eliminarBloque('idioma-${id}')">🗑 Eliminar</button>
        <hr>
    `;

    contenedor.appendChild(div);
}

function eliminarBloque(idBloque) {
    const bloque = document.getElementById(idBloque);
    if (bloque) bloque.remove();
}

function obtenerEstudios() {
    const estudios = [];
    const bloques = document.querySelectorAll(".bloque-estudio");

    bloques.forEach(function(bloque) {
        const id = bloque.id.split("-")[1];
        const graduadoSeleccionado = document.querySelector(`input[name="graduado-${id}"]:checked`);

        estudios.push({
            modalidad: document.getElementById("modalidad-" + id).value,
            semestres: document.getElementById("semestres-" + id).value,
            graduado: graduadoSeleccionado ? graduadoSeleccionado.value : "",
            nombreEstudio: document.getElementById("nombreEstudio-" + id).value.trim(),
            mesTerminacion: document.getElementById("mesTerminacion-" + id).value,
            anioTerminacion: document.getElementById("anioTerminacion-" + id).value,
            tarjeta: document.getElementById("tarjeta-" + id).value.trim()
        });
    });

    return estudios;
}

function obtenerIdiomas() {
    const listaIdiomas = [];
    const bloques = document.querySelectorAll(".bloque-idioma");

    bloques.forEach(function(bloque) {
        const id = bloque.id.split("-")[1];

        listaIdiomas.push({
            idioma: document.getElementById("selectIdioma-" + id).value,
            habla: document.getElementById("habla-" + id).value,
            lee: document.getElementById("lee-" + id).value,
            escribe: document.getElementById("escribe-" + id).value
        });
    });

    return listaIdiomas;
}

function verResumenFormacion() {
    const error = validarFormacionAcademica();
    if (error) {
        document.getElementById("errorFormacion").textContent = error;
        return;
    }

    const estudios = obtenerEstudios();
    const listaIdiomas = obtenerIdiomas();

    let htmlEstudios = estudios.map(function(e, i) {
        return `<p><strong>Estudio ${i + 1}:</strong> ${e.nombreEstudio} — ${e.modalidad} — Graduado: ${e.graduado}</p>`;
    }).join("");

    let htmlIdiomas = listaIdiomas.map(function(idioma) {
        return `<p><strong>${idioma.idioma}:</strong> Habla: ${idioma.habla || "-"} | Lee: ${idioma.lee || "-"} | Escribe: ${idioma.escribe || "-"}</p>`;
    }).join("");

    document.getElementById("contenidoResumenFormacion").innerHTML = `
        <h3>Educación Básica</h3>
        <p><strong>Último grado:</strong> ${document.getElementById("ultimoGrado").value}</p>
        <h3>Estudios Superiores</h3>
        ${htmlEstudios || "<p>Sin estudios superiores registrados</p>"}
        <h3>Idiomas</h3>
        ${htmlIdiomas || "<p>Sin idiomas registrados</p>"}
    `;

    document.getElementById("formacion-academica").style.display = "none";
    document.getElementById("resumenFormacion").style.display = "block";
}

function editarFormacion() {
    document.getElementById("resumenFormacion").style.display = "none";
    document.getElementById("formacion-academica").style.display = "block";
}

function continuarFormacion() {
    const datos = {
        ultimoGrado: document.getElementById("ultimoGrado").value,
        mesGrado: document.getElementById("mesGrado").value,
        anioGrado: document.getElementById("anioGrado").value,
        estudios: obtenerEstudios(),
        idiomas: obtenerIdiomas()
    };

    localStorage.setItem("formacionAcademica", JSON.stringify(datos));
    window.location.href = "experiencia-laboral.html";
}