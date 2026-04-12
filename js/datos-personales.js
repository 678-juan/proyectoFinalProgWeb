document.addEventListener("DOMContentLoaded", function () {
    cargarSelects();

    document.getElementById("deptoNacimiento").addEventListener("change", function () {
        const muns = municipios[this.value] || [];
        cargarSelect("municipioNacimiento", muns);
    });

    document.getElementById("deptoCorrespondencia").addEventListener("change", function () {
        const muns = municipios[this.value] || [];
        cargarSelect("municipioCorrespondencia", muns);
    });

    document.querySelectorAll('input[name="sexo"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
            const seccion = document.getElementById("seccionLibreta");
            seccion.style.display = this.value === "M" ? "block" : "none";
        });
    });
});

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
    arrayDatos.forEach(function (item) {
        const option = document.createElement("option");
        option.value = typeof item === "object" ? item.codigo : item;
        option.textContent = typeof item === "object" ? item.nombre : item;
        select.appendChild(option);
    });
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
        <p><strong>País Nacimiento:</strong> ${datos.paisNacimiento}</p>
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