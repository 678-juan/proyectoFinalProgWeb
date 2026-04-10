// Logica de autenticación
const users = [
    { username: "admin", password: "admin123", rol: "administrador" },
    { username: "user1", password: "123", rol: "usuario" }
];

function login() {
    const inputUsername = document.getElementById("usuario").value;
    const inputPassword = document.getElementById("password").value;

    const encontrado = users.find(function(u){
        return u.username === inputUsername && u.password === inputPassword;
    });

    if (encontrado) {
        // Autenticación exitosa
        localStorage.setItem("sesion", JSON.stringify(encontrado));
    
        if(encontrado.rol === "administrador"){
            window.location.href = "Pages/admin.html";
        }else{
            window.location.href = "Pages/datos-personales.html";
        }
    }else {
        // Autenticación fallida
        document.getElementById("error").textContent = "Usuario o contraseña incorrectos.";
    }
}
