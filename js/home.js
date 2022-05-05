var isOpen = false;

document.getElementById("display-dialogs-button").onclick = function () {
    var button = document.getElementById("display-dialogs-button");
    var list = document.getElementById("chat-list");
    if (isOpen) {
        list.style.display = "none";
        button.innerHTML = '>';
    } else {
        list.style.display = "flex";
        button.innerHTML = '<';
    }
    isOpen = !isOpen;
};