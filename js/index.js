document.getElementById("login-button").onclick = function () {
    let login = document.getElementById("login-textarea");
    window.location.href = `https://andrushens.github.io/ITandDDP-1/home.html?login=${login}`;
};
