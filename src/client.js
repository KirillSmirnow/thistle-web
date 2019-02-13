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

function headers() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
}

function error(response) {
    if (response.responseJSON != null) {
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
