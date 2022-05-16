var isDialogsShown = false;

document.getElementById("display-dialogs-button").onclick = function () {
    var button = document.getElementById("display-dialogs-button");
    var list = document.getElementById("chat-list");
    if (isDialogsShown) {
        list.style.display = "none";
        button.innerHTML = '>';
    } else {
        list.style.display = "flex";
        button.innerHTML = '<';
    }
    isDialogsShown = !isDialogsShown;
};