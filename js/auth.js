// Logica de autenticación
const users = [
    { username: "admin", password: "admin123" },
    { username: "user1", password: "123" }
];

function login(username, password) {
    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;

    const encontrado = users.find(function(u){
        return u.username === inputUsername && u.password === inputPassword;
    });

    if (encontrado) {
        // Autenticación exitosa
        localStorage.setItem("loggedInUser", encontrado.username, JSON.stringify(encontrado));
    
        if(encontrado.username === "administrador"){
            window.location.href = "Pages/admin.html";
        }else{
            window.location.href = "Pages/datos-personales.html";
        }
    }else {
        // Autenticación fallida
        document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos.";
    }
}
