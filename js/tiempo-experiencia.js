document.addEventListener("DOMContentLoaded", function () {
    calcularDesdeExperiencia();
    escucharCambios();
});

// Calcula meses entre dos fechas
function calcularMesesEntreFechas(fechaIngreso, fechaRetiro) {
    const incio = new Date(fechaIngreso);
    const fin = fechaRetiro ? new Date(fechaRetiro) : new Date(); // si no hay ningun retiro utiliza la fecha de hoy

    const anios = fin.getFullYear() - inicio.getFullYear();
    const meses = fin.getMonth() - inicio.getMonth();

    return (anios * 12) + meses;

}

// Lee las experiencias del localStorage y precarga los campos
function calcularDesdeExperiencia() {
    const experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];

    let mesesPublico = 0;
    let mesesPrivado = 0;

    experiencias.forEach(function (exp) {
        if(!exp.fechaIngreso) return; // Si no hay fecha de ingreso, no se puede calcular

        const meses = calcularMesesEntreFechas(exp.fechaIngreso, exp.fechaRetiro);

        if(exp.tipo === "PUBLICO"){
            mesesPublico += meses;
        } else if (exp.tipo === "PRIVADO"){
            mesesPrivado += meses;
        }
    });

    // Convierte meses totales a años y meses
    document.getElementById("aniosPublico").value = Math.floor(mesesPublico / 12);
    document.getElementById("mesesPublico").value = mesesPublico % 12;

    document.getElementById("aniosPrivado").value = Math.floor(mesesPrivado / 12);
    document.getElementById("mesesPrivado").value = mesesPrivado % 12;

    calcularTotal();
}

document.addEventListener("DOMContentLoaded", function () {
    const datosPersonales = JSON.parse(localStorage.getItem("datosPersonales"));
    if(!datosPersonales || !datosPersonales.nombres){
        alert("Por favor completa tus datos personales antes de continuar con el tiempo de experiencia.");
        window.location.href = "datos-personales.html";
        return;
    }
    calcularDesdeExperiencia();
    escucharCambios();
});

function calcularTotal(){

    const aniosPublico = parseInt(document.getElementById("aniosPublico").value) || 0;
    const mesesPublico = parseInt(document.getElementById("mesesPublico").value) || 0;
    const aniosPrivado = parseInt(document.getElementById("aniosPrivado").value) || 0;
    const mesesPrivado = parseInt(document.getElementById("mesesPrivado").value) || 0;
    const aniosIndependiente = parseInt(document.getElementById("aniosIndependiente").value) || 0;
    const mesesIndependiente = parseInt(document.getElementById("mesesIndependiente").value) || 0;

    // Suma todo en meses
    const totalMesesBruto = 

        (aniosPublico * 12) + mesesPublico +
        (aniosPrivado * 12) + mesesPrivado +
        (aniosIndependiente * 12) + mesesIndependiente;

    // Convierte a años y meses
    const totalAnios = Math.floor(totalMesesBruto / 12);
    const totalMeses = totalMesesBruto % 12;
    
    document.getElementById("totalAnios").value = totalAnios;
    document.getElementById("totalMeses").value = totalMeses;
}

// Recalcula el total cada vez que se cambia un campo
function escucharCambios() {
    const campos = [
        "aniosPublico", "mesesPublico",
        "aniosPrivado", "mesesPrivado",
        "aniosIndependiente", "mesesIndependiente"
    ];

    campos.forEach(function (id) {
        document.getElementById(id).addEventListener("input", calcularTotal);
    });
}

function obtenerTiempo() {
    return {
        publico: {
            anios: document.getElementById("aniosPublico").value,
            meses: document.getElementById("mesesPublico").value
        },
        privado: {
            anios: document.getElementById("aniosPrivado").value,
            meses: document.getElementById("mesesPrivado").value
        },
        independiente: {
            anios: document.getElementById("aniosIndependiente").value,
            meses: document.getElementById("mesesIndependiente").value
        },
        totalAnios: document.getElementById("totalAnios").textContent,
        totalMeses: document.getElementById("totalMeses").textContent
    };
}

function verResumenTiempo() {
    const datos = obtenerTiempo();

    document.getElementById("contenidoResumenTiempo").innerHTML = `
        <p><strong>Servidor Público:</strong> ${datos.publico.anios} años, ${datos.publico.meses} meses</p>
        <p><strong>Sector Privado:</strong> ${datos.privado.anios} años, ${datos.privado.meses} meses</p>
        <p><strong>Independiente:</strong> ${datos.independiente.anios} años, ${datos.independiente.meses} meses</p>
        <hr>
        <p><strong>Total:</strong> ${datos.totalAnios} años, ${datos.totalMeses} meses</p>
    `;

    document.getElementById("tiempo-experiencia").style.display = "none";
    document.getElementById("resumenTiempo").style.display = "block";
}

function editarTiempo() {
    document.getElementById("tiempo-experiencia").style.display = "block";
    document.getElementById("resumenTiempo").style.display = "none";
}

function continuarTiempo() {
    const datos = obtenerTiempo();
    localStorage.setItem("tiempoExperiencia", JSON.stringify(datos));
    window.location.href = "certificacion.html";
}