(function () {
    function cargarSelect(idSelect, datos) {
        const select = document.getElementById(idSelect);
        if (!select) {
            return;
        }

        select.innerHTML = "<option value=''>Seleccione...</option>";

        datos.forEach(function (item) {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    }

    function cargarSelects() {
        cargarSelect("tipoDocumento", window.tipoDocumento || []);
        cargarSelect("paisNacimiento", window.paises || []);
        cargarSelect("paisCorrespondencia", window.paises || []);
        cargarSelect("deptoNacimiento", window.departamentos || []);
        cargarSelect("deptoCorrespondencia", window.departamentos || []);
    }

    function obtenerDatos() {
        const sexoSeleccionado = document.querySelector('input[name="sexo"]:checked');
        const nacionalidadSeleccionada = document.querySelector('input[name="nacionalidad"]:checked');

        return {
            primerApellido: document.getElementById("primerApellido").value.trim(),
            segundoApellido: document.getElementById("segundoApellido").value.trim(),
            nombres: document.getElementById("nombres").value.trim(),
            tipoDocumento: document.getElementById("tipoDocumento").value,
            numeroDocumento: document.getElementById("numeroDocumento").value.trim(),
            sexo: sexoSeleccionado ? sexoSeleccionado.value : "",
            nacionalidad: nacionalidadSeleccionada ? nacionalidadSeleccionada.value : "",
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            paisNacimiento: document.getElementById("paisNacimiento").value,
            deptoNacimiento: document.getElementById("deptoNacimiento").value,
            municipioNacimiento: document.getElementById("municipioNacimiento").value,
            paisCorrespondencia: document.getElementById("paisCorrespondencia").value,
            deptoCorrespondencia: document.getElementById("deptoCorrespondencia").value,
            municipioCorrespondencia: document.getElementById("municipioCorrespondencia").value,
            telefono: document.getElementById("telefono").value.trim(),
            email: document.getElementById("email").value.trim()
        };
    }

    function validarDatosPersonales(datos) {
        if (!datos.primerApellido || !datos.nombres || !datos.tipoDocumento || !datos.numeroDocumento) {
            return "Complete nombres, apellidos y documento.";
        }

        if (!datos.sexo || !datos.nacionalidad) {
            return "Seleccione sexo y nacionalidad.";
        }

        if (!datos.fechaNacimiento || !datos.paisNacimiento || !datos.deptoNacimiento || !datos.municipioNacimiento) {
            return "Complete los datos de nacimiento.";
        }

        if (!datos.paisCorrespondencia || !datos.deptoCorrespondencia || !datos.municipioCorrespondencia || !datos.telefono) {
            return "Complete los datos de correspondencia y teléfono.";
        }

        return "";
    }

    function cargarMunicipiosSelect(idDepto, idMunicipio) {
        const depto = document.getElementById(idDepto);
        const municipio = document.getElementById(idMunicipio);

        if (!depto || !municipio) {
            return;
        }

        depto.addEventListener("change", function () {
            const datosMunicipios = (window.municipios && window.municipios[this.value]) || [];
            municipio.innerHTML = "<option value=''>Seleccione...</option>";

            datosMunicipios.forEach(function (item) {
                const option = document.createElement("option");
                option.value = item;
                option.textContent = item;
                municipio.appendChild(option);
            });
        });
    }

    function configurarLibretaMilitar() {
        const radiosSexo = document.querySelectorAll('input[name="sexo"]');
        const seccion = document.getElementById("seccionLibreta");

        radiosSexo.forEach(function (radio) {
            radio.addEventListener("change", function () {
                seccion.style.display = this.value === "M" ? "block" : "none";
            });
        });
    }

    window.verResumen = function () {
        const datos = obtenerDatos();
        const error = validarDatosPersonales(datos);
        const errorContainer = document.getElementById("errorDatos");

        errorContainer.textContent = "";

        if (error) {
            errorContainer.textContent = error;
            return;
        }

        document.getElementById("contenidoResumen").innerHTML = `
            <p><strong>Nombre:</strong> ${datos.nombres} ${datos.primerApellido} ${datos.segundoApellido || ""}</p>
            <p><strong>Documento:</strong> ${datos.tipoDocumento} ${datos.numeroDocumento}</p>
            <p><strong>Sexo:</strong> ${datos.sexo}</p>
            <p><strong>Nacionalidad:</strong> ${datos.nacionalidad}</p>
            <p><strong>Fecha Nacimiento:</strong> ${datos.fechaNacimiento}</p>
            <p><strong>Lugar Nacimiento:</strong> ${datos.municipioNacimiento}, ${datos.deptoNacimiento}, ${datos.paisNacimiento}</p>
            <p><strong>Correspondencia:</strong> ${datos.municipioCorrespondencia}, ${datos.deptoCorrespondencia}, ${datos.paisCorrespondencia}</p>
            <p><strong>Teléfono:</strong> ${datos.telefono}</p>
            <p><strong>Email:</strong> ${datos.email || "No especificado"}</p>
        `;

        document.getElementById("datos-personales").style.display = "none";
        document.getElementById("resumen").style.display = "block";
    };

    window.editarDatos = function () {
        document.getElementById("datos-personales").style.display = "block";
        document.getElementById("resumen").style.display = "none";
    };

    window.continuar = function () {
        const datos = obtenerDatos();
        localStorage.setItem("datosPersonales", JSON.stringify(datos));
        window.location.href = "formacion-academica.html";
    };

    cargarSelects();
    cargarMunicipiosSelect("deptoNacimiento", "municipioNacimiento");
    cargarMunicipiosSelect("deptoCorrespondencia", "municipioCorrespondencia");
    configurarLibretaMilitar();
})();
