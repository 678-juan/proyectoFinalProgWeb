document.addEventListener("DOMContentLoaded", function() {
    const tiempo = JSON.parse(localStorage.getItem("tiempoExperiencia"));
    if (!tiempo) {
        alert("Por favor completa tu tiempo de experiencia antes de continuar con la certificación.");
        window.location.href = "tiempo-experiencia.html";
        return;
    }
});

function enviarHojaDeVida() {
    const error = validarCertificacion();
    if (error) {
        document.getElementById("errorCertificacion").innerText = error;
        return;
    }

    const datosPersonales = JSON.parse(localStorage.getItem("datosPersonales"));
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];

    const duplicado = hojas.find(function(h) {
        return h.datosPersonales.numeroDocumento === datosPersonales.numeroDocumento;
    });

    if(duplicado){
        document.getElementById("errorCertificacion").innerText = 
            "Ya existe una hoja de vida registrada con este número de documento.";
        return;
    }


    const hojaDeVida = {
        id: Date.now(),
        estado: "Diligenciada",
        fechaEnvio: new Date().toLocaleDateString("es-CO"),
        inhabilitado: document.querySelector('input[name="inhabilitado"]:checked').value,
        nombreFirma: document.getElementById("nombreFirma").value.trim(),
        datosPersonales: datosPersonales,
        formacionAcademica: JSON.parse(localStorage.getItem("formacionAcademica")) || {},
        experienciaLaboral: JSON.parse(localStorage.getItem("experienciaLaboral")) || [],
        tiempoExperiencia: JSON.parse(localStorage.getItem("tiempoExperiencia")) || {}
    };

    
    hojas.push(hojaDeVida);
    localStorage.setItem("hojasDeVida", JSON.stringify(hojas));
    localStorage.setItem("miHojaId", hojaDeVida.id);

    document.getElementById("certificacion").style.display = "none";
    document.getElementById("confirmacionFinal").style.display = "block";
}

function verEstado() {
    const miId = localStorage.getItem("miHojaId");
    const hojas = JSON.parse(localStorage.getItem("hojasDeVida")) || [];
    const miHoja = hojas.find(function(h) {
        return h.id == miId;
    });

    if (!miHoja) {
        document.getElementById("contenidoEstado").innerHTML = "<p>No se encontró su hoja de vida.</p>";
        return;
    }

    let colorEstado = "orange";
    if (miHoja.estado === "Aceptada") colorEstado = "green";
    else if (miHoja.estado === "Rechazada") colorEstado = "red";

    document.getElementById("contenidoEstado").innerHTML = `
        <p><strong>Nombre:</strong> ${miHoja.nombreFirma}</p>
        <p><strong>Fecha de envío:</strong> ${miHoja.fechaEnvio}</p>
        <p><strong>Estado:</strong>
            <span style="color:${colorEstado}; font-weight:bold">
                ${miHoja.estado}
            </span>
        </p>
    `;

    document.getElementById("confirmacionFinal").style.display = "none";
    document.getElementById("seccionEstado").style.display = "block";
}

function volverAlInicio() {
    window.location.href = "bienvenida.html";
}