const API = "http://api.thistle.ml";

function vkAuth(vkAuth, callback) {
    $.post({
        url: API + "/auth/vk",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(vkAuth),
        success: callback,
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
    $.post({
        url: API + "/api/audios/upload",
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
