document.addEventListener("DOMContentLoaded", function() {
    const datosPersonales = JSON.parse(localStorage.getItem("datosPersonales"));
    if (!datosPersonales || !datosPersonales.nombres) {
        alert("Por favor completa tus datos personales antes de continuar.");
        window.location.href = "datos-personales.html";
        return;
    }
    calcularDesdeExperiencias();
    escucharCambios();
});

function calcularMesesEntreFechas(fechaIngreso, fechaRetiro) {
    const inicio = new Date(fechaIngreso);
    const fin = fechaRetiro ? new Date(fechaRetiro) : new Date();

    const anios = fin.getFullYear() - inicio.getFullYear();
    const meses = fin.getMonth() - inicio.getMonth();

    return (anios * 12) + meses;
}

function calcularDesdeExperiencias() {
    const experiencias = JSON.parse(localStorage.getItem("experienciaLaboral")) || [];

    let mesesPublico = 0;
    let mesesPrivado = 0;

    experiencias.forEach(function(exp) {
        if (!exp.fechaIngreso) return;

        const meses = calcularMesesEntreFechas(exp.fechaIngreso, exp.fechaRetiro);

        if (exp.tipo === "PUBLICA") {
            mesesPublico += meses;
        } else if (exp.tipo === "PRIVADA") {
            mesesPrivado += meses;
        }
    });

    document.getElementById("aniosPublico").value = Math.floor(mesesPublico / 12);
    document.getElementById("mesesPublico").value = mesesPublico % 12;
    document.getElementById("aniosPrivado").value = Math.floor(mesesPrivado / 12);
    document.getElementById("mesesPrivado").value = mesesPrivado % 12;

    calcularTotal();
}

function calcularTotal() {
    const aniosPublico = parseInt(document.getElementById("aniosPublico").value) || 0;
    const mesesPublico = parseInt(document.getElementById("mesesPublico").value) || 0;
    const aniosPrivado = parseInt(document.getElementById("aniosPrivado").value) || 0;
    const mesesPrivado = parseInt(document.getElementById("mesesPrivado").value) || 0;
    const aniosIndependiente = parseInt(document.getElementById("aniosIndependiente").value) || 0;
    const mesesIndependiente = parseInt(document.getElementById("mesesIndependiente").value) || 0;

    const totalMesesBruto =
        (aniosPublico * 12) + mesesPublico +
        (aniosPrivado * 12) + mesesPrivado +
        (aniosIndependiente * 12) + mesesIndependiente;

    const totalAnios = Math.floor(totalMesesBruto / 12);
    const totalMeses = totalMesesBruto % 12;

    // Calcular años máximos según edad
    const datosPersonales = JSON.parse(localStorage.getItem("datosPersonales"));
    if (datosPersonales) {
        const fechaNac = new Date(datosPersonales.fechaNacimiento);
        const hoy = new Date();
        let edadActual = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edadActual--;
        }
        const aniosMaximos = edadActual - 18;

        if (totalAnios > aniosMaximos) {
            document.getElementById("totalAnios").textContent = totalAnios;
            document.getElementById("totalMeses").textContent = totalMeses;
            document.getElementById("errorTiempo").textContent =
                `El total de experiencia (${totalAnios} años) supera el máximo posible según su edad (${aniosMaximos} años)`;
            return;
        }
    }

    document.getElementById("errorTiempo").textContent = "";
    document.getElementById("totalAnios").textContent = totalAnios;
    document.getElementById("totalMeses").textContent = totalMeses;
}

function escucharCambios() {
    const campos = [
        "aniosPublico", "mesesPublico",
        "aniosPrivado", "mesesPrivado",
        "aniosIndependiente", "mesesIndependiente"
    ];

    campos.forEach(function(id) {
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