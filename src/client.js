const WS_API = "ws://api.thistle.ml";
const HTTP_API = "http://api.thistle.ml";

// User

function vkAuth(vkAuth, callback) {
    $.post({
        url: HTTP_API + "/oauth/vk",
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify(vkAuth),
        success: function (response) {
            getToken(response, callback);
        },
        error: error
    });
}

function getToken(code, callback) {
    $.post({
        url: HTTP_API + "/oauth/token",
        data: {"grant_type": "authorization_code", "code": code},
        headers: {"Authorization": "Basic " + btoa("thistle:thistle")},
        success: function (response) {
            localStorage.setItem("accessToken", response.access_token);
            callback();
        },
        error: error
    });
}

function getProfile(callback) {
    $.get({
        url: HTTP_API + "/api/profile",
        headers: headers(),
        success: callback,
        error: error
    });
}

// Audio

function getAudios(callback) {
    $.get({
        url: HTTP_API + "/api/audios",
        headers: headers(),
        success: callback,
        error: error
    });
}

function uploadAudio(formElement, successCallback, errorCallback) {
    $.ajax({
        url: HTTP_API + "/api/audios/upload",
        method: "PUT",
        data: new FormData(formElement),
        contentType: false,
        processData: false,
        headers: headers(),
        success: successCallback,
        error: function (response) {
            error(response);
            errorCallback();
        }
    });
}

function deleteAudio(id, callback) {
    $.ajax({
        url: HTTP_API + "/api/audios/" + id,
        method: 'DELETE',
        headers: headers(),
        success: callback,
        error: error
    });
}

function searchAudio(query, callback) {
    $.get({
        url: HTTP_API + "/api/audios/search",
        data: {"query": query},
        headers: headers(),
        success: callback,
        error: error
    });
}

// Friends

function addVkFriend(id, callback) {
    $.ajax({
        url: HTTP_API + "/api/friends?vkId=" + id,
        method: "PUT",
        headers: headers(),
        success: callback,
        error: error
    });
}

function getFriends(callback) {
    $.get({
        url: HTTP_API + "/api/friends",
        headers: headers(),
        success: callback,
        error: error
    });
}

function follow(id, callback) {
    $.ajax({
        url: HTTP_API + "/api/friends/" + id + "/follow",
        method: "PUT",
        headers: headers(),
        success: callback,
        error: error
    });
}

function unfollow(id, callback) {
    $.ajax({
        url: HTTP_API + "/api/friends/" + id + "/unfollow",
        method: "PUT",
        headers: headers(),
        success: callback,
        error: error
    });
}

// Chats

function getChats(callback) {
    $.get({
        url: HTTP_API + "/api/chats",
        headers: headers(),
        success: callback,
        error: error
    });
}

function createChat(chat, callback) {
    $.post({
        url: HTTP_API + "/api/chats",
        contentType: "application/json",
        data: JSON.stringify(chat),
        headers: headers(),
        success: callback,
        error: error
    });
}

function getMessages(chatId, callback) {
    $.get({
        url: HTTP_API + "/api/chats/" + chatId + "/messages",
        headers: headers(),
        success: callback,
        error: error
    });
}

function sendMessage(chatId, text, callback) {
    $.post({
        url: HTTP_API + "/api/chats/" + chatId + "/messages",
        data: {text: text},
        headers: headers(),
        success: callback,
        error: error
    });
}

// Common

function headers() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
}

function error(response) {
    if (response.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.replace("/index.html");
    } else if (response.status === 413) {
        alert("Too large file");
    } else if (response.responseJSON != null) {
        if (response.responseJSON.developerMessage != null) {
            console.log("Error: " + response.responseJSON.developerMessage);
            alert(response.responseJSON.userMessage);
        } else {
            console.log("Error: " + JSON.stringify(response.responseJSON));
        }
    } else {
        console.log("Error: " + JSON.stringify(response));
    }
}
