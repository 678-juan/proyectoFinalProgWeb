(function () {
    const maxExperiencias = 4;
    const listaExperiencias = document.getElementById("listaExperiencias");
    const btnAgregar = document.getElementById("agregarExperiencia");
    const form = document.getElementById("formExperiencia");
    const errorExperiencia = document.getElementById("errorExperiencia");

    const seccionFormulario = document.getElementById("experiencia-laboral");
    const seccionResumen = document.getElementById("resumenExperiencia");
    const contenidoResumen = document.getElementById("contenidoResumenExperiencia");
    const btnEditar = document.getElementById("editarExperiencia");
    const btnConfirmar = document.getElementById("confirmarExperiencia");

    const catalogoPaises = Array.isArray(window.paises) ? window.paises : ["Colombia"];
    const catalogoDepartamentos = Array.isArray(window.departamentos) ? window.departamentos : [];
    const catalogoMunicipios = typeof window.municipios === "object" && window.municipios ? window.municipios : {};

    let totalExperiencias = 0;

    function crearOpciones(arrayDatos, placeholder) {
        const opciones = [`<option value="">${placeholder}</option>`];

        arrayDatos.forEach(function (item) {
            opciones.push(`<option value="${item}">${item}</option>`);
        });

        return opciones.join("");
    }

    function obtenerTituloBloque(indice) {
        if (indice === 1) {
            return "Empleo actual o contrato vigente";
        }

        return "Empleo o contrato anterior " + (indice - 1);
    }

    function construirBloqueExperiencia(indice) {
        const idBase = "exp_" + indice;
        const esActual = indice === 1;

        const bloque = document.createElement("article");
        bloque.className = "experiencia-card";
        bloque.dataset.index = String(indice);

        bloque.innerHTML = `
            <div class="experiencia-header">
                <h3>${obtenerTituloBloque(indice)}</h3>
                ${esActual ? "" : `<button type="button" class="btn-secundario btnEliminar">Eliminar</button>`}
            </div>

            <div class="experiencia-grid">
                <div class="campo col-8">
                    <label for="${idBase}_empresa">Empresa o entidad *</label>
                    <input type="text" id="${idBase}_empresa" maxlength="120" required>
                </div>

                <div class="campo col-4">
                    <label for="${idBase}_sector">Sector *</label>
                    <select id="${idBase}_sector" required>
                        <option value="">Seleccione...</option>
                        <option value="PUBLICA">Pública</option>
                        <option value="PRIVADA">Privada</option>
                    </select>
                </div>

                <div class="campo col-4">
                    <label for="${idBase}_pais">País *</label>
                    <select id="${idBase}_pais" required>${crearOpciones(catalogoPaises, "Seleccione...")}</select>
                </div>

                <div class="campo col-4">
                    <label for="${idBase}_departamento">Departamento *</label>
                    <select id="${idBase}_departamento" required>${crearOpciones(catalogoDepartamentos, "Seleccione...")}</select>
                </div>

                <div class="campo col-4">
                    <label for="${idBase}_municipio">Municipio *</label>
                    <select id="${idBase}_municipio" required>
                        <option value="">Seleccione departamento primero...</option>
                    </select>
                </div>

                <div class="campo col-6">
                    <label for="${idBase}_correo">Correo electrónico de la entidad</label>
                    <input type="email" id="${idBase}_correo" maxlength="120">
                </div>

                <div class="campo col-6">
                    <label for="${idBase}_telefono">Teléfono</label>
                    <input type="tel" id="${idBase}_telefono" maxlength="25" placeholder="Ej: 3001234567">
                </div>

                <div class="campo col-6">
                    <label for="${idBase}_cargo">Cargo o contrato *</label>
                    <input type="text" id="${idBase}_cargo" maxlength="100" required>
                </div>

                <div class="campo col-6">
                    <label for="${idBase}_dependencia">Dependencia</label>
                    <input type="text" id="${idBase}_dependencia" maxlength="100">
                </div>

                <div class="campo col-12">
                    <label for="${idBase}_direccion">Dirección</label>
                    <input type="text" id="${idBase}_direccion" maxlength="160">
                </div>

                <div class="campo col-4">
                    <label for="${idBase}_fechaIngreso">Fecha de ingreso *</label>
                    <input type="date" id="${idBase}_fechaIngreso" required>
                </div>

                <div class="campo col-4">
                    <label for="${idBase}_fechaRetiro">Fecha de retiro</label>
                    <input type="date" id="${idBase}_fechaRetiro">
                </div>

                <div class="campo col-4">
                    <label>Estado *</label>
                    <div class="inline-check">
                        <input type="checkbox" id="${idBase}_actual" ${esActual ? "checked" : ""}>
                        <label for="${idBase}_actual">Actualmente trabaja aquí</label>
                    </div>
                </div>
            </div>
        `;

        const checkActual = bloque.querySelector(`#${idBase}_actual`);
        const inputRetiro = bloque.querySelector(`#${idBase}_fechaRetiro`);
        const selectDepartamento = bloque.querySelector(`#${idBase}_departamento`);
        const selectMunicipio = bloque.querySelector(`#${idBase}_municipio`);

        function actualizarEstadoRetiro() {
            if (checkActual.checked) {
                inputRetiro.value = "";
                inputRetiro.disabled = true;
                inputRetiro.required = false;
            } else {
                inputRetiro.disabled = false;
                inputRetiro.required = true;
            }
        }

        function cargarMunicipiosPorDepartamento() {
            const depto = selectDepartamento.value;
            const municipios = catalogoMunicipios[depto] || [];
            selectMunicipio.innerHTML = crearOpciones(municipios, "Seleccione...");
        }

        checkActual.addEventListener("change", actualizarEstadoRetiro);
        selectDepartamento.addEventListener("change", cargarMunicipiosPorDepartamento);

        actualizarEstadoRetiro();

        if (!esActual) {
            const btnEliminar = bloque.querySelector(".btnEliminar");
            btnEliminar.addEventListener("click", function () {
                bloque.remove();
                renumerarBloques();
            });
        }

        return bloque;
    }

    function renumerarBloques() {
        const bloques = Array.from(listaExperiencias.querySelectorAll(".experiencia-card"));
        totalExperiencias = bloques.length;

        bloques.forEach(function (bloque, i) {
            const numero = i + 1;
            const titulo = bloque.querySelector("h3");
            titulo.textContent = obtenerTituloBloque(numero);
            bloque.dataset.index = String(numero);
        });

        btnAgregar.disabled = totalExperiencias >= maxExperiencias;
    }

    function agregarBloque() {
        if (totalExperiencias >= maxExperiencias) {
            return;
        }

        totalExperiencias += 1;
        const bloque = construirBloqueExperiencia(totalExperiencias);
        listaExperiencias.appendChild(bloque);

        if (totalExperiencias >= maxExperiencias) {
            btnAgregar.disabled = true;
        }
    }

    function obtenerDatosExperiencias() {
        const bloques = Array.from(listaExperiencias.querySelectorAll(".experiencia-card"));

        return bloques.map(function (_, i) {
            const idBase = "exp_" + (i + 1);

            return {
                tipo: i === 0 ? "ACTUAL" : "ANTERIOR",
                empresa: document.getElementById(`${idBase}_empresa`).value.trim(),
                sector: document.getElementById(`${idBase}_sector`).value,
                pais: document.getElementById(`${idBase}_pais`).value,
                departamento: document.getElementById(`${idBase}_departamento`).value,
                municipio: document.getElementById(`${idBase}_municipio`).value,
                correoEntidad: document.getElementById(`${idBase}_correo`).value.trim(),
                telefono: document.getElementById(`${idBase}_telefono`).value.trim(),
                cargo: document.getElementById(`${idBase}_cargo`).value.trim(),
                dependencia: document.getElementById(`${idBase}_dependencia`).value.trim(),
                direccion: document.getElementById(`${idBase}_direccion`).value.trim(),
                fechaIngreso: document.getElementById(`${idBase}_fechaIngreso`).value,
                fechaRetiro: document.getElementById(`${idBase}_fechaRetiro`).value,
                actual: document.getElementById(`${idBase}_actual`).checked
            };
        });
    }

    function validarExperiencias(experiencias) {
        if (experiencias.length === 0) {
            return "Debe registrar al menos una experiencia laboral.";
        }

        for (let i = 0; i < experiencias.length; i++) {
            const exp = experiencias[i];
            const numero = i + 1;

            if (!exp.empresa || !exp.sector || !exp.pais || !exp.departamento || !exp.municipio || !exp.cargo || !exp.fechaIngreso) {
                return "Complete los campos obligatorios del bloque " + numero + ".";
            }

            if (!exp.actual && !exp.fechaRetiro) {
                return "La experiencia " + numero + " debe tener fecha de retiro o marcarse como actual.";
            }

            if (exp.fechaRetiro && exp.fechaRetiro < exp.fechaIngreso) {
                return "La fecha de retiro no puede ser menor a la fecha de ingreso en el bloque " + numero + ".";
            }
        }

        return "";
    }

    function renderizarResumen(experiencias, observaciones) {
        const bloques = experiencias.map(function (exp, i) {
            return `
                <article class="item-resumen">
                    <strong>${i === 0 ? "Actual" : "Anterior " + i}</strong>
                    <p><strong>Empresa:</strong> ${exp.empresa}</p>
                    <p><strong>Cargo/Contrato:</strong> ${exp.cargo}</p>
                    <p><strong>Sector:</strong> ${exp.sector}</p>
                    <p><strong>Ubicación:</strong> ${exp.municipio}, ${exp.departamento}, ${exp.pais}</p>
                    <p><strong>Ingreso:</strong> ${exp.fechaIngreso}</p>
                    <p><strong>Retiro:</strong> ${exp.actual ? "Vigente" : exp.fechaRetiro}</p>
                </article>
            `;
        });

        contenidoResumen.innerHTML = `
            ${bloques.join("")}
            <article class="item-resumen">
                <strong>Observaciones</strong>
                <p>${observaciones || "Sin observaciones."}</p>
            </article>
        `;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        errorExperiencia.textContent = "";

        const experiencias = obtenerDatosExperiencias();
        const observaciones = document.getElementById("observacionesExperiencia").value.trim();
        const error = validarExperiencias(experiencias);

        if (error) {
            errorExperiencia.textContent = error;
            return;
        }

        const payload = {
            experiencias: experiencias,
            observaciones: observaciones
        };

        localStorage.setItem("experienciaLaboral", JSON.stringify(payload));
        renderizarResumen(experiencias, observaciones);

        seccionFormulario.style.display = "none";
        seccionResumen.style.display = "block";
    });

    btnAgregar.addEventListener("click", agregarBloque);

    btnEditar.addEventListener("click", function () {
        seccionResumen.style.display = "none";
        seccionFormulario.style.display = "block";
    });

    btnConfirmar.addEventListener("click", function () {
        window.location.href = "tiempo-experiencia.html";
    });

    agregarBloque();
})();
