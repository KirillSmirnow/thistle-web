CHATS = [];
SELECTED_CHAT = -1;
USER_ID = -1;

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
    if (text.length > 0) {
        sendMessage(CHATS[SELECTED_CHAT].id, text, function () {
            $("#message-input").val("");
        });
    }
}

// Actions

function updateProfile() {
    getProfile(function (profile) {
        USER_ID = profile.id;
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

            let stomp = Stomp.client(WS_API + "/ws");
            stomp.connect({}, function () {
                stomp.subscribe("/chats/" + CHATS[i].id, function (message) {
                    if (CHATS[i].id === CHATS[SELECTED_CHAT].id) {
                        addMessage(JSON.parse(message.body));
                    }
                });
            });
        }

        $("#chats").children().first().click();
    });
}

function updateMessages() {
    getMessages(CHATS[SELECTED_CHAT].id, function (messages) {
        $("#messages").empty();
        for (let i in messages.reverse()) {
            addMessage(messages[i]);
        }
        $("#message-input").focus();
    });
}

function addMessage(message) {
    let element = $("<div>");
    $("#messages").append(element);

    let author = $("<div>");
    author.addClass("message-author");
    author.text(message.author.firstName + " " + message.author.lastName);

    if (message.author.id === USER_ID) {
        element.addClass("message-self");
    } else {
        element.addClass("message");
        element.append(author);
    }

    let text = $("<div>");
    element.append(text);
    text.addClass("message-text");
    text.text(message.text);

    let time = $("<div>");
    element.append(time);
    time.addClass("message-time");
    time.text(formatMessageTime(message.dateTime));

    $('#messages').scrollTop($('#messages')[0].scrollHeight);
}
