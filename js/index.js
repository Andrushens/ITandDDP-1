document.getElementById("login-button").onclick = function () {
    let login = document.getElementById("login-textarea");
    window.location.href = `http://127.0.0.1:5500/home.html?login=${login.value}`;
};
