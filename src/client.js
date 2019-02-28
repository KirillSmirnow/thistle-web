const API = "http://api.thistle.ml";

function vkAuth(vkAuth, callback) {
    $.post({
        url: API + "/oauth/vk",
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
        url: API + "/oauth/token",
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
        url: API + "/api/profile",
        headers: headers(),
        success: callback,
        error: error
    });
}

function getAudios(callback) {
    $.get({
        url: API + "/api/audios",
        headers: headers(),
        success: callback,
        error: error
    });
}

function uploadAudio(formElement, successCallback, errorCallback) {
    $.ajax({
        url: API + "/api/audios/upload",
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
        url: API + "/api/audios/" + id,
        method: 'DELETE',
        headers: headers(),
        success: callback,
        error: error
    });
}

function searchAudio(query, callback) {
    $.get({
        url: API + "/api/audios/search",
        data: {"query": query},
        headers: headers(),
        success: callback,
        error: error
    });
}

function getFriends(callback) {
    $.get({
        url: API + "/api/friends",
        headers: headers(),
        success: callback,
        error: error
    });
}

function follow(id, callback) {
    $.ajax({
        url: API + "/api/friends/" + id + "/follow",
        method: "PUT",
        headers: headers(),
        success: callback,
        error: error
    });
}

function unfollow(id, callback) {
    $.ajax({
        url: API + "/api/friends/" + id + "/unfollow",
        method: "PUT",
        headers: headers(),
        success: callback,
        error: error
    });
}

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
