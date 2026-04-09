function enviarHojaDeVida(){
    const error = validarCertificacion();
    if(error){
        document.getElementById("errorCertificacion").innerText = error;
        return;
    }

    // devuelve el objeto completo de la hoja de vida
    const hojaDeVida = {
        id: Date.now(), // ID único basado en timestamp
        estado: "Diligenciada",
        fechaEnvio: new Date().toLocaleDateString("es-CO"),
        inhabilitado: document.querySelector('input[name="inhabilitado"]:checked').value,
        nombreFirma: document.getElementById("nombreFirma").value.trim(),
        datosPersonales: JSON.parse(localStorage.getItem("datosPersonales")) || {},
        formacionAcademica: JSON.parse(localStorage.getItem("formacionAcademica")) || {},
        experienciaLaboral: JSON.parse(localStorage.getItem("experienciaLaboral")) || [],
        tiempoExperiencia: JSON.parse(localStorage.getItem("tiempoExperiencia")) || {}
    };

    // Guarda en el arreglo de hojas de vida que tiene el admin
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];
    hojas.push(hojaDeVida);
    localStorage.setItem("hojasDeVida", JSON.stringify(hojas));

    // Guarda el id de la hoja de vida actual para consultar su info despues
    localStorage.setItem("ultimaHojaDeVida", hojaDeVida.id);

    // Muestra la confirmación
    document.getElementById("certificacionForm").style.display = "none";
    document.getElementById("confirmacionFinal").style.display = "block";
}

function verEstado(){
    const miId = localStorage.getItem("miHojaId");
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];
    const miHoja = hojas.find(function(h){
        return h.id == miId;
    });

    if (!miHoja){
        document.getElementById("contenidoEstado").innerText =
             "<p>No se encontró su hoja de vida.</p>";
        return;
    }
    
    // Define el color segun el estado
    let colorEstado = "";
    if(miHoja.estado === "ACEPTADA"){
        colorEstado = "green";
    } else if(miHoja.estado === "RECHAZADA"){
        color = "red";
    }

    document.getElementById("contenidoEstado").innerHTML = 
    `
        <p><strong>Nombre:</strong> ${miHoja.nombreFirma}</p>
        <p><strong>Fecha de envío:</strong> ${miHoja.fechaEnvio}</p>
        <p><strong>Estado:</strong> 
            <span style="color:${colorEstado}; font-weight:bold">
                ${miHoja.estado}
            </span>
        </p>
    `;

    document.getElementById("confirmacionActual").style.display = "none";
    document.getElementById("seccionEsatdo").style.display = "block";

}

function volverAlInicio(){
    // Limpia todos los localStorage
    localStorage.removeItem("datosPersonales");
    localStorage.removeItem("formacionAcademica");
    localStorage.removeItem("experienciaLaboral");
    localStorage.removeItem("tiempoExperiencia");

    window.location.href = "../index.html";
}