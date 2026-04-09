// logica basica de auth
const users = [
    { username: "admin", password: "admin123" },
    { username: "user1", password: "123" }
];

function login() {
    // leemos lo q escribe el usuario
    const inputUsername = document.getElementById("usuario").value.trim();
    const inputPassword = document.getElementById("password").value;
    const errorText = document.getElementById("error");

    // limpiamos error viejito
    errorText.textContent = "";

    // buscamos si existe una combinacion valida
    const encontrado = users.find(function(u){
        return u.username === inputUsername && u.password === inputPassword;
    });

    if (encontrado) {
        // guardamos sesion simple  en localstorage
        localStorage.setItem("loggedInUser", JSON.stringify(encontrado));
    
        // luego de login correcto va directo a datos personales
        window.location.href = "Pages/datos-personales.html";
    } else {
        // mensaje simple si falla el login
        errorText.textContent = "Usuario o contraseña incorrectos.";
    }
}
