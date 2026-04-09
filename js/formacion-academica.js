let contadorEstudios = 0;
let contadorIdiomas = 0;

document.getElementById("DOMContentLoaded", function(){
    cargarGrados();
});

// Llena el select del 1 al 11 grado
function cargarGrados(){
    const select = document.getElementById("ultimoGrado");
    select.innerHTML = '<option value="">-- Seleccione --</option>';
    for(let i = 1; i <= 11; i++){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = "Grado " + i;
        select.appendChild(option);
    }
}

// Agrega un nuevo campo de estudio
function agregarEstudio() {
    contadorEstudios++;
    const id = contadorEstudios;
    const contenedor = document.getElementById("listaEstudios");

    // Crea el div del estudio
    const div = document.createElement("div");
    div.classList.add("bloque-estudio");
    div.id = "estudio-" + id;

    // Construye las opciones de modalidad desde data.js
    let opcionesModalidad = '<option value="">-- Seleccione --</option>';
    modalidadesAcademicas.forEach(function(m) {
        opcionesModalidad += `<option value="${m.codigo}">${m.nombre}</option>`;
    });

    // Inserta el HTML del bloque
    div.innerHTML = `
        <h4>Estudio #${id}</h4>

        <div class="campo">
            <label>Modalidad Académica *</label>
            <select id="modalidad-${id}">${opcionesModalidad}</select>
        </div>

        <div class="campo">
            <label>Número de Semestres Aprobados *</label>
            <input type="number" id="semestres-${id}" min="1">
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
            <input type="number" id="mesTerminacion-${id}" min="1" max="12" placeholder="MM">
        </div>

        <div class="campo">
            <label>Año de Terminación *</label>
            <input type="number" id="anioTerminacion-${id}" min="1950" max="2030" placeholder="AAAA">
        </div>

        <div class="campo">
            <label>No. Tarjeta Profesional</label>
            <input type="text" id="tarjeta-${id}">
        </div>

        <button onclick="eliminarBloque('estudio-${id}')">🗑 Eliminar</button>
        <hr>
    `;

    contenedor.appendChild(div);
}

// Agregarun bloque de idioma nuevo
function agregarIddioma(){
    contadorIdiomas++;
    const id = contadorIdiomas;
    const contenedor = document.getElementById("listaIdiomas");

    const div = document.createElement("div");
    div.classList.add("bloque-idioma");
    div.id = "idioma-" + id;

    // Opciones de idiomas desde data.js
    let opcionesIdioma = '<option value="">-- Seleccione --</option>';
    idiomas.forEach(function(idioma) {
        opcionesIdioma += `<option value="${idioma}">${idioma}</option>`;
    });

    div.innerHTML =  `
        <h4>Idioma #${id}</h4>

        <div class="campo">
            <label>Idioma *</label>
            <select id="idioma-${id}">${opcionesIdioma}</select>
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

// Elimina el bloque por id
function eliminarBloque(idBloque){
    const bloque = document.getElementById(idBloque);
    if (bloque) {
        bloque.remove();
    }
}

//Recolecta estudios del DOM
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

// Reecolecta idiomas del DOM
function obtenerIdiomas() {
    const listaIdiomas = [];
    const bloques = document.querySelectorAll(".bloque-idioma");

    bloques.forEach(function(bloque) {
        const id = bloque.id.split("-")[1];

        listaIdiomas.push({
            idioma: document.getElementById("idioma-" + id).value,
            habla: document.getElementById("habla-" + id).value,
            lee: document.getElementById("lee-" + id).value,
            escribe: document.getElementById("escribe-" + id).value
        });
    });

    return listaIdiomas;
}

function verResumenFormacion(){
    const error = validarFormacionAcademica();
    if(error){
        document.getElementById("errorFormacion").textContent = error;
        retturn;
    }

    const estudios = obtenerEstudios();
    const idiomas = obtenerIdiomas();

    let htmlEstudios = estudios.map(function(e,i){
        return `<p><strong>Estudio ${i + 1}:</strong> ${e.nombreEstudio} — ${e.modalidad} — Graduado: ${e.graduado}</p>`;
    }).join("");

    let htmlIdiomas = listaIdiomas.map(function(i){
        return `<p><strong>${i.idioma}:</strong> Habla: ${i.habla || "-"} | Lee: ${i.lee || "-"} | Escribe: ${i.escribe || "-"}</p>`;
    }).join("");

    document.getElementById("contenidoResumenFormacion").innerHTML = `
        <h3>Educación Básica</h3>
        <p><strong>Último grado:</strong> ${document.getElementById("ultimoGrado").value}</p>
        <p><strong>Título:</strong> ${document.getElementById("tituloObtenido").value || "No especificado"}</p>
        <h3>Estudios Superiores</h3>
        ${htmlEstudios || "<p>Sin estudios superiores registrados</p>"}
        <h3>Idiomas</h3>
        ${htmlIdiomas || "<p>Sin idiomas registrados</p>"}
    `;

    document.getElementById("formacion-academica").style.display = "none";
    document.getElementById("resumenFormacion").style.display = "block";
}

function editarFormacion(){
    document.getElementById("resumenFormacion").style.display = "none";
    document.getElementById("formacion-academica").style.display = "block";
}

function continuarFormacion(){
    const datos = {
        ultimoGrado: document.getElementById("ultimoGrado").value,
        tituloObtenido: document.getElementById("tituloObtenido").value,
        mesGrado: document.getElementById("mesGrado").value,
        anioGrado: document.getElementById("anioGrado").value,
        estudios: obtenerEstudios(),
        idiomas: obtenerIdiomas()
    };

    localStorage.setItem("formacionAcademica", JSON.stringify(datos));
    window.location.href = "experiencia-laboral.html";
}

