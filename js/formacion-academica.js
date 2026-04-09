(function () {
    // refs principales del html
    const form = document.getElementById("formFormacion");
    const errorFormacion = document.getElementById("errorFormacion");
    const listaSuperior = document.getElementById("listaEducacionSuperior");
    const listaIdiomas = document.getElementById("listaIdiomas");
    const btnAgregarSuperior = document.getElementById("agregarSuperior");
    const btnAgregarIdioma = document.getElementById("agregarIdioma");
    const btnContinuarFormacion = document.getElementById("continuarFormacion");

    const seccionForm = document.getElementById("formacion-academica");
    const seccionResumen = document.getElementById("resumenFormacion");
    const contResumen = document.getElementById("contenidoResumenFormacion");
    const btnEditar = document.getElementById("editarFormacion");
    const btnConfirmar = document.getElementById("confirmarFormacion");

    // catologos q vienen desde data.js
    const catalogoModalidades = Array.isArray(window.modalidadesAcademicas) ? window.modalidadesAcademicas : [];
    const catalogoIdiomas = Array.isArray(window.idiomas) ? window.idiomas : [];
    const catalogoNiveles = Array.isArray(window.nivelesIdioma) ? window.nivelesIdioma : ["R", "B", "MB"];

    const maxSuperior = 6;
    const maxIdiomas = 6;

    // helper chiquito para armar options
    function crearOptions(datos, placeholder, usaCodigo) {
        const options = [`<option value="">${placeholder}</option>`];

        datos.forEach(function (item) {
            if (usaCodigo) {
                options.push(`<option value="${item.codigo}">${item.codigo} - ${item.nombre}</option>`);
            } else {
                options.push(`<option value="${item}">${item}</option>`);
            }
        });

        return options.join("");
    }

    function crearItemSuperior(numero) {
        const item = document.createElement("article");
        item.className = "academica-card academica-item academica-superior-item";

        item.innerHTML = `
            <div class="academica-header">
                <h4 class="item-title">Estudio superior ${numero}</h4>
                <button type="button" class="btn-secundario btn-eliminar-item">Eliminar</button>
            </div>

            <div class="experiencia-grid">
                <div class="campo col-4">
                    <label>Modalidad académica *</label>
                    <select class="sup-modalidad" required>
                        ${crearOptions(catalogoModalidades, "Seleccione...", true)}
                    </select>
                </div>

                <div class="campo col-4">
                    <label>No. semestres aprobados *</label>
                    <input type="number" class="sup-semestres" min="1" max="20" required>
                </div>

                <div class="campo col-4">
                    <label>Graduado *</label>
                    <select class="sup-graduado" required>
                        <option value="">Seleccione...</option>
                        <option value="SI">Sí</option>
                        <option value="NO">No</option>
                    </select>
                </div>

                <div class="campo col-8">
                    <label>Nombre de los estudios o título obtenido *</label>
                    <input type="text" class="sup-titulo" maxlength="150" required>
                </div>

                <div class="campo col-2">
                    <label>Mes</label>
                    <input type="number" class="sup-mes" min="1" max="12" placeholder="MM">
                </div>

                <div class="campo col-2">
                    <label>Año</label>
                    <input type="number" class="sup-anio" min="1950" max="2100" placeholder="AAAA">
                </div>

                <div class="campo col-12">
                    <label>No. de tarjeta profesional (si aplica)</label>
                    <input type="text" class="sup-tarjeta" maxlength="60">
                </div>
            </div>
        `;

        item.querySelector(".btn-eliminar-item").addEventListener("click", function () {
            item.remove();
            renumerarItems(listaSuperior, "Estudio superior ");
            bloquearBotonSiLlegoAlMaximo();
        });

        return item;
    }

    function crearItemIdioma(numero) {
        const item = document.createElement("article");
        item.className = "academica-card academica-item academica-idioma-item";

        item.innerHTML = `
            <div class="academica-header">
                <h4 class="item-title">Idioma ${numero}</h4>
                <button type="button" class="btn-secundario btn-eliminar-item">Eliminar</button>
            </div>

            <div class="experiencia-grid">
                <div class="campo col-4">
                    <label>Idioma *</label>
                    <select class="idi-idioma" required>
                        ${crearOptions(catalogoIdiomas, "Seleccione...", false)}
                    </select>
                </div>

                <div class="campo col-8"></div>

                <div class="campo col-4">
                    <label>Lo habla *</label>
                    <select class="idi-habla" required>
                        ${crearOptions(catalogoNiveles, "Seleccione...", false)}
                    </select>
                </div>

                <div class="campo col-4">
                    <label>Lo lee *</label>
                    <select class="idi-lee" required>
                        ${crearOptions(catalogoNiveles, "Seleccione...", false)}
                    </select>
                </div>

                <div class="campo col-4">
                    <label>Lo escribe *</label>
                    <select class="idi-escribe" required>
                        ${crearOptions(catalogoNiveles, "Seleccione...", false)}
                    </select>
                </div>
            </div>
        `;

        item.querySelector(".btn-eliminar-item").addEventListener("click", function () {
            item.remove();
            renumerarItems(listaIdiomas, "Idioma ");
            bloquearBotonSiLlegoAlMaximo();
        });

        return item;
    }

    function renumerarItems(contenedor, prefijo) {
        const items = contenedor.querySelectorAll(".academica-item");

        items.forEach(function (item, i) {
            item.querySelector(".item-title").textContent = prefijo + (i + 1);
        });
    }

    function bloquearBotonSiLlegoAlMaximo() {
        const totalSuperior = listaSuperior.querySelectorAll(".academica-item").length;
        const totalIdiomas = listaIdiomas.querySelectorAll(".academica-item").length;

        btnAgregarSuperior.disabled = totalSuperior >= maxSuperior;
        btnAgregarIdioma.disabled = totalIdiomas >= maxIdiomas;
    }

    function agregarSuperior() {
        const total = listaSuperior.querySelectorAll(".academica-item").length;

        if (total < maxSuperior) {
            listaSuperior.appendChild(crearItemSuperior(total + 1));
            bloquearBotonSiLlegoAlMaximo();
        }
    }

    function agregarIdioma() {
        const total = listaIdiomas.querySelectorAll(".academica-item").length;

        if (total < maxIdiomas) {
            listaIdiomas.appendChild(crearItemIdioma(total + 1));
            bloquearBotonSiLlegoAlMaximo();
        }
    }

    // leemos datos sin depender de ids dinamicos
    function leerEducacionSuperior() {
        const items = Array.from(listaSuperior.querySelectorAll(".academica-superior-item"));

        return items.map(function (item) {
            return {
                modalidad: item.querySelector(".sup-modalidad").value,
                semestres: item.querySelector(".sup-semestres").value,
                graduado: item.querySelector(".sup-graduado").value,
                titulo: item.querySelector(".sup-titulo").value.trim(),
                mesTerminacion: item.querySelector(".sup-mes").value,
                anioTerminacion: item.querySelector(".sup-anio").value,
                tarjetaProfesional: item.querySelector(".sup-tarjeta").value.trim()
            };
        });
    }

    function leerIdiomas() {
        const items = Array.from(listaIdiomas.querySelectorAll(".academica-idioma-item"));

        return items.map(function (item) {
            return {
                idioma: item.querySelector(".idi-idioma").value,
                habla: item.querySelector(".idi-habla").value,
                lee: item.querySelector(".idi-lee").value,
                escribe: item.querySelector(".idi-escribe").value
            };
        });
    }

    function validarDatos(basica, superior, idiomas) {
        if (!basica.ultimoGrado || !basica.mesGrado || !basica.anioGrado) {
            return "Complete los campos obligatorios de educación básica y media.";
        }

        if (superior.length === 0) {
            return "Debe registrar al menos un estudio de educación superior.";
        }

        for (let i = 0; i < superior.length; i++) {
            const item = superior[i];

            if (!item.modalidad || !item.semestres || !item.graduado || !item.titulo) {
                return "Complete los campos obligatorios del estudio superior " + (i + 1) + ".";
            }

            if (item.mesTerminacion && (Number(item.mesTerminacion) < 1 || Number(item.mesTerminacion) > 12)) {
                return "El mes de terminación del estudio superior " + (i + 1) + " no es válido.";
            }
        }

        if (idiomas.length === 0) {
            return "Debe registrar al menos un idioma.";
        }

        for (let i = 0; i < idiomas.length; i++) {
            const item = idiomas[i];

            if (!item.idioma || !item.habla || !item.lee || !item.escribe) {
                return "Complete todos los datos del idioma " + (i + 1) + ".";
            }
        }

        return "";
    }

    function renderizarResumen(payload) {
        const htmlSuperior = payload.educacionSuperior.map(function (item, i) {
            return `
                <article class="item-resumen">
                    <strong>Estudio superior ${i + 1}</strong>
                    <p><strong>Modalidad:</strong> ${item.modalidad}</p>
                    <p><strong>Semestres:</strong> ${item.semestres}</p>
                    <p><strong>Graduado:</strong> ${item.graduado}</p>
                    <p><strong>Título:</strong> ${item.titulo}</p>
                    <p><strong>Terminación:</strong> ${item.mesTerminacion || "-"}/${item.anioTerminacion || "-"}</p>
                    <p><strong>Tarjeta profesional:</strong> ${item.tarjetaProfesional || "No aplica"}</p>
                </article>
            `;
        }).join("");

        const htmlIdiomas = payload.idiomas.map(function (item, i) {
            return `
                <article class="item-resumen">
                    <strong>Idioma ${i + 1}</strong>
                    <p><strong>Idioma:</strong> ${item.idioma}</p>
                    <p><strong>Habla:</strong> ${item.habla}</p>
                    <p><strong>Lee:</strong> ${item.lee}</p>
                    <p><strong>Escribe:</strong> ${item.escribe}</p>
                </article>
            `;
        }).join("");

        contResumen.innerHTML = `
            <article class="item-resumen">
                <strong>Educación básica y media</strong>
                <p><strong>Último grado:</strong> ${payload.educacionBasica.ultimoGrado}</p>
                <p><strong>Título obtenido:</strong> ${payload.educacionBasica.titulo || "No especificado"}</p>
                <p><strong>Fecha de grado:</strong> ${payload.educacionBasica.mesGrado}/${payload.educacionBasica.anioGrado}</p>
            </article>

            ${htmlSuperior}

            ${htmlIdiomas}
        `;
    }

    function obtenerBasica() {
        return {
            ultimoGrado: document.getElementById("ultimoGrado").value,
            titulo: document.getElementById("tituloBasica").value.trim(),
            mesGrado: document.getElementById("mesGradoBasica").value,
            anioGrado: document.getElementById("anioGradoBasica").value
        };
    }

    // envio del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        errorFormacion.textContent = "";

        const educacionBasica = obtenerBasica();
        const educacionSuperior = leerEducacionSuperior();
        const idiomas = leerIdiomas();
        const error = validarDatos(educacionBasica, educacionSuperior, idiomas);

        if (error) {
            errorFormacion.textContent = error;
            return;
        }

        const payload = {
            educacionBasica: educacionBasica,
            educacionSuperior: educacionSuperior,
            idiomas: idiomas
        };

        localStorage.setItem("formacionAcademica", JSON.stringify(payload));
        renderizarResumen(payload);

        seccionForm.style.display = "none";
        seccionResumen.style.display = "block";
    });

    btnAgregarSuperior.addEventListener("click", agregarSuperior);
    btnAgregarIdioma.addEventListener("click", agregarIdioma);

    btnContinuarFormacion.addEventListener("click", function () {
        window.location.href = "experiencia-laboral.html";
    });

    btnEditar.addEventListener("click", function () {
        seccionResumen.style.display = "none";
        seccionForm.style.display = "block";
    });

    btnConfirmar.addEventListener("click", function () {
        window.location.href = "experiencia-laboral.html";
    });

    // dejamos 1 bloque inicial para no arrancar vacio
    agregarSuperior();
    agregarIdioma();
})();
