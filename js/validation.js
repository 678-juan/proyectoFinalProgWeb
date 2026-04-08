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