function cargarSelects() {
    cargarSelect("tipoDocumento", tiposDocumento);
    cargarSelect("paisNacimiento", paises);
    cargarSelect("paisCorrespondencia", paises);
    cargarSelect("deptoNacimiento", departamentos);
    cargarSelect("deptoCorrespondencia", departamentos);
}

// Funcion que se reutiliza para cargar los selects
function cargarSelect(idSelect, arrayDatos) {
    const select = document.getElementById(idSelect);
    select.innerHTML = "<option value=''>Seleccione...</option>"; // Limpiar el select antes de cargar los datos
    arreglo.forEach(function (item) {
        const option = document.createElement("option");
        option.value = typeof item === "object" ? item.codigo : item; // Si el item es un objeto, usar su código como valor, de lo contrario usar el item directamente
        option.textContent = typeof item === "object" ? item.nombre : item; // Si el item es un objeto, usar su nombre como texto, de lo contrario usar el item directamente
        select.appendChild(option);
    });
}

// Municipios dinámicos según departamento — nacimiento
document.getElementById("deptoNacimiento").addEventListener("change", function () {
    const municipios = municipiosPorDepartamento[this.value] || [];
    cargarSelect("municipioNacimiento", municipios);
});

// Municipios dinámicos según departamento — correspondencia
document.getElementById("deptoCorrespondencia").addEventListener("change", function () {
    const municipios = municipiosPorDepartamento[this.value] || [];
    cargarSelect("municipioCorrespondencia", municipios);
});

// Mostrar libreta si selecciona masculino
document.querySelectorAll('input[name="sexo"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        const seccion = document.getElementById("seccionLibreta");
        seccion.style.display = this.value === "M" ? "block" : "none";
    });
});

function varResumen() {
    // Valida primero
    const error = validarDatosPersonales();
    if (error) {
        document.getElementById("errorDatos").textContent = error;
        return;
    }

    // Construye el resumen
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

function continuar(){
    const datos = obtenerDatos();
    localStorage.setItem("datosPersonales", JSON.stringify(datos));
    window.location.href = "formacion-academica.html";
}