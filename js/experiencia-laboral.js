let constadorExperiencias = 0;

document.addEventListener("DOMContentLoaded", function() {
    const formacion = JSON.parse(localStorage.getItem("formacionAcademica"));
    if (!formacion || !formacion.ultimoGrado) {
        alert("Por favor completa tu formación académica antes de continuar con la experiencia laboral.");
        window.location.href = "formacion-academica.html";
        return;
    }

    document.getElementById("listaExperiencias").addEventListener("input", function(e) {
        if (e.target.id && e.target.id.startsWith("empresa-")) {
            e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9]/g, "");
        }
        if (e.target.id && e.target.id.startsWith("cargo-")) {
            e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        }
        if (e.target.id && e.target.id.startsWith("dependencia-")) {
            e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        }
        if (e.target.id && e.target.id.startsWith("telefonoExp-")) {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
            if (e.target.value.length > 15) e.target.value = e.target.value.slice(0, 15);
        }
    });

    document.getElementById("listaExperiencias").addEventListener("change", function(e) {
        if (e.target.id && e.target.id.startsWith("fechaRetiro-")) {
            const idBloque = e.target.id.split("-")[1];
            const fechaIngreso = document.getElementById("fechaIngreso-" + idBloque).value;
            if (fechaIngreso && e.target.value < fechaIngreso) {
                alert("La fecha de retiro debe ser posterior a la fecha de ingreso");
                e.target.value = "";
            }
        }

        // País cambia — actualiza región o depto/municipio
        if (e.target.id && e.target.id.startsWith("paisExp-")) {
            const idBloque = e.target.id.split("-")[1];
            const pais = e.target.value;
            const esColombia = pais === "Colombia";
            const seccionColombia = document.getElementById("seccionColombiaExp-" + idBloque);
            const seccionExtranjero = document.getElementById("seccionExtranjeroExp-" + idBloque);

            seccionColombia.style.display = esColombia ? "block" : "none";
            seccionExtranjero.style.display = esColombia ? "none" : "block";

            if (!esColombia) {
                const regiones = regionesPorPais[pais] || [];
                const selectRegion = document.getElementById("regionExp-" + idBloque);
                selectRegion.innerHTML = '<option value="">-- Seleccione --</option>';
                regiones.forEach(function(r) {
                    const option = document.createElement("option");
                    option.value = r;
                    option.textContent = r;
                    selectRegion.appendChild(option);
                });
            }
        }
    });
});

function agregarExperiencia() {
    constadorExperiencias++;
    const id = constadorExperiencias;
    const contenedor = document.getElementById("listaExperiencias");

    let opcionesPaises = '<option value="">-- Seleccione --</option>';
    paises.forEach(function(pais) {
        opcionesPaises += `<option value="${pais}">${pais}</option>`;
    });

    let opcionesDeptos = '<option value="">-- Seleccione --</option>';
    departamentos.forEach(function(depto) {
        opcionesDeptos += `<option value="${depto}">${depto}</option>`;
    });

    const div = document.createElement("div");
    div.classList.add("bloque-experiencia");
    div.id = "experiencia-" + id;

    div.innerHTML = `
        <h4>Experiencia #${id}</h4>

        <div class="campo">
            <label>Empresa o Entidad *</label>
            <input type="text" id="empresa-${id}" placeholder="Nombre de la empresa">
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

        <!-- Si es Colombia -->
        <div id="seccionColombiaExp-${id}" style="display:none">
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
        </div>

        <!-- Si es otro país -->
        <div id="seccionExtranjeroExp-${id}" style="display:none">
            <div class="campo">
                <label>Región *</label>
                <select id="regionExp-${id}">
                    <option value="">-- Seleccione país primero --</option>
                </select>
            </div>
        </div>

        <div class="campo">
            <label>Correo Electrónico Entidad</label>
            <input type="email" id="correoEntidad-${id}" placeholder="correo@empresa.com">
        </div>

        <div class="campo">
            <label>Teléfono</label>
            <input type="text" id="telefonoExp-${id}" placeholder="Solo números">
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
            <input type="text" id="cargo-${id}" placeholder="Solo letras">
        </div>

        <div class="campo">
            <label>Dependencia</label>
            <input type="text" id="dependencia-${id}" placeholder="Solo letras">
        </div>

        <div class="campo">
            <label>Dirección</label>
            <input type="text" id="direccionExp-${id}">
        </div>

        <button onclick="eliminarBloque('experiencia-${id}')">🗑 Eliminar</button>
        <hr>
    `;

    contenedor.appendChild(div);

    document.getElementById("deptoExp-" + id).addEventListener("change", function() {
        const muns = municipios[this.value] || [];
        const selectMunicipio = document.getElementById("municipioExp-" + id);
        selectMunicipio.innerHTML = '<option value="">-- Seleccione --</option>';
        muns.forEach(function(m) {
            const option = document.createElement("option");
            option.value = m;
            option.textContent = m;
            selectMunicipio.appendChild(option);
        });
    });
}

function eliminarBloque(idBloque) {
    const bloque = document.getElementById(idBloque);
    if (bloque) bloque.remove();
}

function obtenerExperiencias() {
    const experiencias = [];
    const bloques = document.querySelectorAll(".bloque-experiencia");

    bloques.forEach(function(bloque) {
        const id = bloque.id.split("-")[1];
        const tipoSeleccionado = document.querySelector(`input[name="tipoEmpresa-${id}"]:checked`);
        const pais = document.getElementById("paisExp-" + id).value;
        const esColombia = pais === "Colombia";

        experiencias.push({
            empresa: document.getElementById("empresa-" + id).value.trim(),
            tipo: tipoSeleccionado ? tipoSeleccionado.value : "",
            pais: pais,
            depto: esColombia ? document.getElementById("deptoExp-" + id).value : "",
            municipio: esColombia ? document.getElementById("municipioExp-" + id).value : "",
            region: !esColombia ? document.getElementById("regionExp-" + id).value : "",
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
                <p><strong>País:</strong> ${e.pais} ${e.depto ? "— " + e.depto : ""} ${e.region ? "— " + e.region : ""}</p>
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

function continuarExperiencia() {
    const datos = obtenerExperiencias();
    localStorage.setItem("experienciaLaboral", JSON.stringify(datos));
    window.location.href = "tiempo-experiencia.html";
}