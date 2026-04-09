function validarDatosPersonales(){
    const datos = obtenerDatos();

    if (!datos.primerApellido) return "El primer apellido es obligatorio";
    if (!datos.nombres) return "El nombre es obligatorio";
    if (!datos.tipoDocumento) return "Seleccione un tipo de documento";
    if (!datos.numeroDocumento) return "El número de documento es obligatorio";
    if (!datos.sexo) return "Seleccione el sexo";
    if (!datos.nacionalidad) return "Seleccione la nacionalidad";
    if (!datos.fechaNacimiento) return "La fecha de nacimiento es obligatoria";
    if (!datos.paisNacimiento) return "Seleccione el país de nacimiento";
    if (!datos.deptoNacimiento) return "Seleccione el departamento de nacimiento";
    if (!datos.municipioNacimiento) return "Seleccione el municipio de nacimiento";
    if (!datos.telefono) return "El teléfono es obligatorio";
    
    return null;
}

function validarFormacionAcademica() {
    const ultimoGrado = document.getElementById("ultimoGrado").value;
    if (!ultimoGrado) return "Seleccione el último grado aprobado";

    // Valida cada estudio agregado
    const bloques = document.querySelectorAll(".bloque-estudio");
    for (let i = 0; i < bloques.length; i++) {
        const id = bloques[i].id.split("-")[1];
        const modalidad = document.getElementById("modalidad-" + id).value;
        const nombre = document.getElementById("nombreEstudio-" + id).value.trim();
        const graduado = document.querySelector(`input[name="graduado-${id}"]:checked`);

        if (!modalidad) return `Estudio #${parseInt(id)}: seleccione la modalidad`;
        if (!nombre) return `Estudio #${parseInt(id)}: ingrese el nombre del estudio`;
        if (!graduado) return `Estudio #${parseInt(id)}: indique si se graduó`;
    }

    return null;
}

function validarExperienciaLaboral() {
    const bloques = document.querySelectorAll(".bloque-experiencia");

    for (let i = 0; i < bloques.length; i++) {
        const id = bloques[i].id.split("-")[1];
        const empresa = document.getElementById("empresa-" + id).value.trim();
        const tipo = document.querySelector(`input[name="tipoEmpresa-${id}"]:checked`);
        const fechaIngreso = document.getElementById("fechaIngreso-" + id).value;
        const cargo = document.getElementById("cargo-" + id).value.trim();

        if (!empresa) return `Experiencia #${id}: ingrese el nombre de la empresa`;
        if (!tipo) return `Experiencia #${id}: seleccione si es pública o privada`;
        if (!fechaIngreso) return `Experiencia #${id}: ingrese la fecha de ingreso`;
        if (!cargo) return `Experiencia #${id}: ingrese el cargo`;
    }

    return null;
}

function validarCertificacion() {
    const inhabilitado = document.querySelector('input[name="inhabilitado"]:checked');
    const confirmaDatos = document.getElementById("confirmaDatos").checked;
    const nombreFirma = document.getElementById("nombreFirma").value.trim();

    if (!inhabilitado) return "Debe indicar si se encuentra inhabilitado o no";
    if (!confirmaDatos) return "Debe certificar que los datos son verídicos";
    if (!nombreFirma) return "Ingrese su nombre completo para firmar";

    return null;
}