let constadorExperiencias = 0;

function agregarExperiencias(){
    constadorExperiencias++;
    const id = constadorExperiencias;
    const contenedor = document.getElementById("listaExperiencias");

    // Opciones de departamentos
    let opcionesDeptos = '<option value="">-- Seleccione --</option>';
    departamentos.forEach(function(depto) {
        opcionesDeptos += `<option value="${depto}">${depto}</option>`;
    });

    // Opciones de paises
    let opcionesPaises = '<option value="">-- Seleccione --</option>';
    paises.forEach(function(pais) {
        opcionesPaises += `<option value="${pais}">${pais}</option>`;
    });

    const div = document.createElement("div");
    div.classList.add("bloque-experiencia");
    div.id = "experiencia-" + id;

    div.innerHTML = `
        <h4>Experiencia #${id}</h4>

        <div class="campo">
            <label>Empresa o Entidad *</label>
            <input type="text" id="empresa-${id}">
        </div>

        <div class="campo">
            <label>Tipo *</label>
            <label><input type="radio" name="tipoEmpresa-${id}" value="PUBLICA"> Pública</label>
            <label><input type="radio" name="tipoEmpresa-${id}" value="PRIVADA"> Privada</label>
        </div>

        <div class="campo">
            <label>País *</label>
            <select id="paisExp-${id}">${opcionesPaises}</select>
        </div>

        <div class="campo">
            <label>Departamento *</label>
            <select id="deptoExp-${id}">${opcionesDeptos}</select>
        </div>

        <div class="campo">
            <label>Municipio *</label>
            <select id="municipioExp-${id}">
                <option value="">-- Seleccione depto primero --</option>
            </select>
        </div>

        <div class="campo">
            <label>Correo Electrónico Entidad</label>
            <input type="email" id="correoEntidad-${id}">
        </div>

        <div class="campo">
            <label>Teléfono</label>
            <input type="text" id="telefonoExp-${id}">
        </div>

        <div class="campo">
            <label>Fecha de Ingreso *</label>
            <input type="date" id="fechaIngreso-${id}">
        </div>

        <div class="campo">
            <label>Fecha de Retiro</label>
            <input type="date" id="fechaRetiro-${id}">
        </div>

        <div class="campo">
            <label>Cargo o Contrato *</label>
            <input type="text" id="cargo-${id}">
        </div>

        <div class="campo">
            <label>Dependencia</label>
            <input type="text" id="dependencia-${id}">
        </div>

        <div class="campo">
            <label>Dirección</label>
            <input type="text" id="direccionExp-${id}">
        </div>

        <button onclick="eliminarBloque('experiencia-${id}')">🗑 Eliminar</button>
        <hr>
    `;

    contenedor.appendChild(div);

    // Municipios dinamicos
    document.getElementById("deptoExp-" + id).addEventListener("change", function() {
        const municipios = municipiosPorDepartamento[this.value] || [];
        const selectMunicipio = document.getElementById("municipioExp-" + id);
        selectMunicipio.innerHTML = '<option value="">-- Seleccione --</option>';
        municipios.forEach(function(m) {
            const option = document.createElement("option");
            option.value = m;
            option.textContent = m;
            selectMunicipio.appendChild(option);
        });
    });
}

function eliminarBloque(id) {
    const bloque = document.getElementById(idBloque);
    if(bloque) bloque.remove();
}

function obtenerExperiencias() {
    const experiencias = [];
    const bloques = document.querySelectorAll(".bloque-experiencia");

    bloques.forEach(function(bloque) {
        const id = bloque.id.split("-")[1];
        const tipoSeleccionado = document.querySelector(`input[name="tipoEmpresa-${id}"]:checked`);

        experiencias.push({
            empresa: document.getElementById("empresa-" + id).value.trim(),
            tipo: tipoSeleccionado ? tipoSeleccionado.value : "",
            pais: document.getElementById("paisExp-" + id).value,
            depto: document.getElementById("deptoExp-" + id).value,
            municipio: document.getElementById("municipioExp-" + id).value,
            correoEntidad: document.getElementById("correoEntidad-" + id).value.trim(),
            telefono: document.getElementById("telefonoExp-" + id).value.trim(),
            fechaIngreso: document.getElementById("fechaIngreso-" + id).value,
            fechaRetiro: document.getElementById("fechaRetiro-" + id).value,
            cargo: document.getElementById("cargo-" + id).value.trim(),
            dependencia: document.getElementById("dependencia-" + id).value.trim(),
            direccion: document.getElementById("direccionExp-" + id).value.trim()
        });
    });

    return experiencias;
}

function verResumenExperiencia() {
    const error = validarExperienciaLaboral();
    if (error) {
        document.getElementById("errorExperiencia").textContent = error;
        return;
    }

    const experiencias = obtenerExperiencias();

    let htmlExperiencias = experiencias.map(function(e, i) {
        return `
            <div>
                <p><strong>Experiencia ${i + 1}:</strong> ${e.empresa}</p>
                <p><strong>Cargo:</strong> ${e.cargo}</p>
                <p><strong>Tipo:</strong> ${e.tipo}</p>
                <p><strong>Ingreso:</strong> ${e.fechaIngreso} — 
                   <strong>Retiro:</strong> ${e.fechaRetiro || "Actual"}</p>
            </div>
        `;
    }).join("");

    document.getElementById("contenidoResumenExperiencia").innerHTML =
        htmlExperiencias || "<p>Sin experiencia laboral registrada</p>";

    document.getElementById("experiencia-laboral").style.display = "none";
    document.getElementById("resumenExperiencia").style.display = "block";
}

function editarExperiencia() {
    document.getElementById("experiencia-laboral").style.display = "block";
    document.getElementById("resumenExperiencia").style.display = "none";
}

function continuarExperiencia(){
    const datos = obtenerExperiencias();
    localStorage.setItem("experienciaLaboral", JSON.stringify(datos));
    window.location.href = "tiempo-experiencia.html";
}