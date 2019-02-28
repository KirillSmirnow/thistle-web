CHATS = [];
SELECTED_CHAT = -1;

// Initialize components

// On page loaded

if (localStorage.getItem("accessToken") == null) {
    signOut();
} else {
    updateProfile();
    updateChatsList();
}

// Controls

function signOut() {
    localStorage.removeItem("accessToken");
    window.location.replace("/index.html");
}

function sendTextMessage(event) {
    event.preventDefault();
    let text = $("#message-input").val();
    sendMessage(CHATS[SELECTED_CHAT].id, text, function () {
        $("#message-input").val("");
        updateMessages();
    });
}

// Actions

function updateProfile() {
    getProfile(function (profile) {
        $("#name").text(profile["firstName"] + " " + profile["lastName"]);
    });
}

function updateChatsList() {
    getChats(function (chats) {
        CHATS = chats;
        $("#chats").empty();
        for (let i in CHATS) {
            let element = $("<div>");
            $("#chats").append(element);
            element.addClass("chat-element");

            let name = $("<span>");
            element.append(name);
            name.addClass("chat-name");
            name.text(CHATS[i].name);

            element.click(function () {
                $("#chats").children("div").each(function () {
                    $(this).removeClass("selected");
                });
                element.addClass("selected");
                SELECTED_CHAT = i;
                updateMessages();
            });
        }
    });
}

function updateMessages() {
    getMessages(CHATS[SELECTED_CHAT].id, function (messages) {
        $("#messages").empty();
        for (let i in messages.reverse()) {
            let element = $("<div>");
            $("#messages").append(element);
            element.addClass("chat-element");

            let text = $("<span>");
            element.append(text);
            text.addClass("chat-name");
            text.text(messages[i].text);

            let time = $("<span>");
            element.append(time);
            time.addClass("chat-name");
            time.text(messages[i].dateTime);

            let author = $("<span>");
            element.append(author);
            author.addClass("chat-name");
            author.text(messages[i].author.firstName + " " + messages[i].author.lastName);
        }

        $('#messages').scrollTop($('#messages')[0].scrollHeight);
        $("#message-input").focus();
    });
}
