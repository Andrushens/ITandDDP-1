var isDialogsShown = true;

document.getElementById("display-dialogs-button").onclick = function () {
    let button = document.getElementById("display-dialogs-button");
    let list = document.getElementById("chat-list");
    if (isDialogsShown) {
        list.className = 'chat-list non-visible';
        button.innerHTML = '>';
    } else {
        list.className = 'chat-list visible';
        button.innerHTML = '<';
    }
    isDialogsShown = !isDialogsShown;
};