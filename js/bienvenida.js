document.addEventListener("DOMContentLoaded", function() {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (!sesion) {
        window.location.href = "../index.html";
        return;
    }

    // Saludo personalizado
    document.getElementById("saludo").textContent = 
        "¡Hola, " + sesion.username + "! 👋";
});

function comenzar() {
    window.location.href = "datos-personales.html";
}

function cerrarSesion(){
    localStorage.removeItem("sesion");
    window.location.href = "../index.html";
}