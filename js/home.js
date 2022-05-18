var isDialogsShown = true;
var mainUsername;
var dialogs;
var currentDialogIdx = 0;
var selectedMessagesIndexes = [];

function onLoad() {
    let url = window.location.href;
    let regex = new RegExp('[?&]' + 'login' + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    let name = results[2].replace(/\+/g, ' ');
    mainUsername = name;

    let currentUser = document.getElementById("current-user");
    currentUser.innerHTML = name;

    dialogs = [
        new Dialog(
            mainUsername,
            'Alyona Alyona',
            [
                new Message(mainUsername, "hello, it's right", "14:22"),
                new Message("Qwertas", "hello, it's left", "14:23"),
                new Message("Qwertas", "gfdg", "14:24"),
                new Message("Qwertas", "qwertas asd zxc", "14:25"),
                new Message(mainUsername, "Wow good", "14:26"),
                new Message("Qwertas", "bye, it's left", "14:27"),
            ],
        ),
        new Dialog(
            mainUsername,
            'Kalush',
            [
                new Message(mainUsername, "another right message", "15:22"),
                new Message("Kalush", "another left message", "15:23"),
            ],
        ),
    ];

    initDialogs();
    initMessages();
}

function initDialogs() {
    let currentDialogs = document.getElementById("chat-list");
    while (currentDialogs.childNodes.length > 2) {
        currentDialogs.removeChild(currentDialogs.lastChild);
    }
    for (var i = 0; i < dialogs.length; i++) {
        displayDialog(dialogs[i]);
    }
}

function displayDialog(dialog) {
    let a = document.createElement("a");
    a.className = "chat-list--body-element";
    a.onclick = () => onDialogClick(dialog);
    let lastMessage = dialog.messages.length > 0 ? dialog.messages.at(-1) : null;
    a.innerHTML = `
        <div class="chat-list--name-message">
            <p>${dialog.secondUser}</p>
            <small class="hint">${lastMessage?.text ?? 'no messages yet'}</small>
        </div>
        <time class="hint">${lastMessage?.date ?? ''}</time>
    `;
    let currentDialogs = document.getElementById("chat-list");
    currentDialogs.appendChild(a);
}

function initMessages() {
    let currentMessages = document.getElementById("chat--messages");
    while (currentMessages.childNodes.length > 0) {
        currentMessages.removeChild(currentMessages.lastChild);
    }
    let messages = dialogs[currentDialogIdx].messages;
    for (var i = 0; i < messages.length; i++) {
        displayMessage(messages[i], i);
    }
}

function displayMessage(message, msgIndex) {
    let currentMessages = document.getElementById("chat--messages");
    let li = document.createElement("li");
    let index = msgIndex;
    li.className = message.author == mainUsername ? "message-right" : "message-left";
    li.addEventListener("click", function onclick() {
        let id = selectedMessagesIndexes.indexOf(index);
        if (id > -1) {
            selectedMessagesIndexes.splice(id, 1);
            li.style.filter = "brightness(100%)";
        } else {
            selectedMessagesIndexes.push(index);
            li.style.filter = "brightness(50%)";
        }
    });
    li.innerHTML = `
        <p>${message.text}</p>
        <time class="hint">${message.date}</time>
    `;
    currentMessages.appendChild(li);
}

function onSendMessage() {
    let form = document.forms.message;
    var text = form.text.value;
    if (text == '') return;
    var now = new Date();
    let time = `${now.getHours()}:${now.getMinutes()}`
    dialogs[currentDialogIdx].messages.push(new Message(mainUsername, text, time));

    let message = new Message(mainUsername, text, time);
    let index = dialogs[currentDialogIdx].messages.length;
    let id = selectedMessagesIndexes.indexOf(index);
    displayMessage(message, id);

    let currentMessages = document.getElementById("chat--messages");
    currentMessages.scrollTop = currentMessages.scrollHeight;
    form.text.value = '';
};

function onCreateDialog() {
    let form = document.forms.dialog;
    var text = form.text.value;
    if (text == '') return;
    let dialog = new Dialog(mainUsername, text, []);
    dialogs.push(dialog);
    displayDialog(dialog);
    form.text.value = '';
}

function onDialogClick(dialog) {
    selectedMessagesIndexes = [];
    let messages = dialog.messages;
    let currentMessages = document.getElementById("chat--messages");
    while (currentMessages.childNodes.length > 0) {
        currentMessages.removeChild(currentMessages.lastChild);
    }
    for (var i = 0; i < messages.length; i++) {
        let id = selectedMessagesIndexes.indexOf(i);
        displayMessage(messages[i], id);
    }
    currentDialogIdx = dialogs.indexOf(dialog);
}

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

document.getElementById("delete-button").onclick = function () {
    if (selectedMessagesIndexes.length > 0) {
        selectedMessagesIndexes.sort(function (a, b) {
            return b - a;
        });
        for (var i = 0; i < selectedMessagesIndexes.length; i++) {
            dialogs[currentDialogIdx].messages.splice(selectedMessagesIndexes[i], 1);
        }
        selectedMessagesIndexes = [];
        initMessages();
    } else {
        dialogs.splice(currentDialogIdx, 1);
        initDialogs();
        currentDialogIdx = 0;
        initMessages();
    }
};

class Message {
    constructor(author, text, date) {
        this.author = author;
        this.text = text;
        this.date = date;
    }
}

class Dialog {
    constructor(firstUser, secondUser, messages) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
        this.messages = messages;
    }
}