document.addEventListener("DOMContentLoaded", function() {
    cargarSelects();

    // Municipios dinámicos nacimiento
    document.getElementById("deptoNacimiento").addEventListener("change", function() {
        const muns = municipios[this.value] || [];
        cargarSelect("municipioNacimiento", muns);
    });

    // Municipios dinámicos correspondencia
    document.getElementById("deptoCorrespondencia").addEventListener("change", function() {
        const muns = municipios[this.value] || [];
        cargarSelect("municipioCorrespondencia", muns);
    });

    // Nacimiento — muestra depto/municipio si es Colombia, regiones si es otro país
    document.getElementById("paisNacimiento").addEventListener("change", function() {
        const esColombia = this.value === "Colombia";
        const regiones = regionesPorPais[this.value] || [];

        document.getElementById("seccionDeptoNacimiento").style.display = esColombia ? "block" : "none";
        document.getElementById("seccionRegionNacimiento").style.display = esColombia ? "none" : "block";

        if (!esColombia && regiones.length > 0) {
            cargarSelect("regionNacimiento", regiones);
        }
    });

    // Correspondencia — igual
    document.getElementById("paisCorrespondencia").addEventListener("change", function() {
        const esColombia = this.value === "Colombia";
        const regiones = regionesPorPais[this.value] || [];

        document.getElementById("seccionDeptoCorrespondencia").style.display = esColombia ? "block" : "none";
        document.getElementById("seccionRegionCorrespondencia").style.display = esColombia ? "none" : "block";

        if (!esColombia && regiones.length > 0) {
            cargarSelect("regionCorrespondencia", regiones);
        }
    });

    // Libreta militar solo si es C.C y masculino
    document.querySelectorAll('input[name="sexo"]').forEach(function(radio) {
        radio.addEventListener("change", function() {
            const seccion = document.getElementById("seccionLibreta");
            const tipoDoc = document.getElementById("tipoDocumento").value;
            seccion.style.display = (this.value === "M" && tipoDoc === "C.C") ? "block" : "none";
        });
    });

    document.getElementById("tipoDocumento").addEventListener("change", function() {
        const seccionLibreta = document.getElementById("seccionLibreta");
        const sexoSeleccionado = document.querySelector('input[name="sexo"]:checked');
        if (this.value === "C.C" && sexoSeleccionado && sexoSeleccionado.value === "M") {
            seccionLibreta.style.display = "block";
        } else {
            seccionLibreta.style.display = "none";
            document.getElementById("numeroLibreta").value = "";
        }
        validarCruce();
    });

    document.querySelectorAll('input[name="nacionalidad"]').forEach(function(radio) {
        radio.addEventListener("change", validarCruce);
    });

    document.getElementById("numeroLibreta").addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, "");
        if (this.value.length > 15) this.value = this.value.slice(0, 15);
    });

    ["primerApellido", "segundoApellido", "nombres"].forEach(function(id) {
        document.getElementById(id).addEventListener("input", function() {
            this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        });
    });

    ["telefono", "numeroDocumento"].forEach(function(id) {
        document.getElementById(id).addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value.length > 15) this.value = this.value.slice(0, 15);
        });
    });
});

function validarCruce() {
    const tipoDoc = document.getElementById("tipoDocumento").value;
    const nacionalidad = document.querySelector('input[name="nacionalidad"]:checked');
    const errorDatos = document.getElementById("errorDatos");

    if (!tipoDoc || !nacionalidad) return;

    if (nacionalidad.value === "COL" && tipoDoc === "C.E") {
        errorDatos.textContent = "Inconsistencia: la Cédula de Extranjería (C.E.) es expedida por Migración Colombia exclusivamente a extranjeros. Los ciudadanos colombianos deben seleccionar Cédula de Ciudadanía (C.C.).";
        return;
    }
    if (nacionalidad.value === "EXTRANJERO" && tipoDoc === "C.C") {
        errorDatos.textContent = "Inconsistencia: la Cédula de Ciudadanía (C.C.) es un documento exclusivo de ciudadanos colombianos. Los extranjeros deben seleccionar Cédula de Extranjería (C.E.) o Pasaporte.";
        return;
    }

    errorDatos.textContent = "";
}

function cargarSelects() {
    cargarSelect("tipoDocumento", tipoDocumento);
    cargarSelect("paisNacimiento", paises);
    cargarSelect("paisCorrespondencia", paises);
    cargarSelect("deptoNacimiento", departamentos);
    cargarSelect("deptoCorrespondencia", departamentos);
}

function cargarSelect(idSelect, arrayDatos) {
    const select = document.getElementById(idSelect);
    select.innerHTML = "<option value=''>Seleccione...</option>";
    arrayDatos.forEach(function(item) {
        const option = document.createElement("option");
        option.value = typeof item === "object" ? item.codigo : item;
        option.textContent = typeof item === "object" ? item.nombre : item;
        select.appendChild(option);
    });
}

function obtenerDatos() {
    const sexoSeleccionado = document.querySelector('input[name="sexo"]:checked');
    const nacionalidadSeleccionada = document.querySelector('input[name="nacionalidad"]:checked');
    const paisNac = document.getElementById("paisNacimiento").value;
    const paisCorr = document.getElementById("paisCorrespondencia").value;

    return {
        primerApellido: document.getElementById("primerApellido").value.trim(),
        segundoApellido: document.getElementById("segundoApellido").value.trim(),
        nombres: document.getElementById("nombres").value.trim(),
        tipoDocumento: document.getElementById("tipoDocumento").value,
        numeroDocumento: document.getElementById("numeroDocumento").value.trim(),
        numeroLibreta: document.getElementById("numeroLibreta").value.trim(),
        sexo: sexoSeleccionado ? sexoSeleccionado.value : "",
        nacionalidad: nacionalidadSeleccionada ? nacionalidadSeleccionada.value : "",
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        paisNacimiento: paisNac,
        deptoNacimiento: paisNac === "Colombia" ? document.getElementById("deptoNacimiento").value : "",
        municipioNacimiento: paisNac === "Colombia" ? document.getElementById("municipioNacimiento").value : "",
        regionNacimiento: paisNac !== "Colombia" ? document.getElementById("regionNacimiento").value : "",
        paisCorrespondencia: paisCorr,
        deptoCorrespondencia: paisCorr === "Colombia" ? document.getElementById("deptoCorrespondencia").value : "",
        municipioCorrespondencia: paisCorr === "Colombia" ? document.getElementById("municipioCorrespondencia").value : "",
        regionCorrespondencia: paisCorr !== "Colombia" ? document.getElementById("regionCorrespondencia").value : "",
        telefono: document.getElementById("telefono").value.trim(),
        email: document.getElementById("email").value.trim()
    };
}

function verResumen() {
    const error = validarDatosPersonales();
    if (error) {
        document.getElementById("errorDatos").textContent = error;
        return;
    }

    const datos = obtenerDatos();
    document.getElementById("contenidoResumen").innerHTML = `
        <p><strong>Nombre:</strong> ${datos.nombres} ${datos.primerApellido} ${datos.segundoApellido}</p>
        <p><strong>Documento:</strong> ${datos.tipoDocumento} ${datos.numeroDocumento}</p>
        <p><strong>Sexo:</strong> ${datos.sexo}</p>
        <p><strong>Nacionalidad:</strong> ${datos.nacionalidad}</p>
        <p><strong>Fecha Nacimiento:</strong> ${datos.fechaNacimiento}</p>
        <p><strong>País Nacimiento:</strong> ${datos.paisNacimiento} ${datos.deptoNacimiento ? "— " + datos.deptoNacimiento : ""} ${datos.regionNacimiento ? "— " + datos.regionNacimiento : ""}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Email:</strong> ${datos.email || "No especificado"}</p>
    `;

    document.getElementById("datos-personales").style.display = "none";
    document.getElementById("resumen").style.display = "block";
}

function editarDatos() {
    document.getElementById("datos-personales").style.display = "block";
    document.getElementById("resumen").style.display = "none";
}

function continuar() {
    const datos = obtenerDatos();
    localStorage.setItem("datosPersonales", JSON.stringify(datos));
    window.location.href = "formacion-academica.html";
}