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
        success: callback,
        error: error
    });
}

function error(response) {
    if (response.responseJSON.developerMessage != null) {
        console.log("Error: " + response.responseJSON.developerMessage);
        alert(response.responseJSON.userMessage);
    } else {
        console.log("Error: " + response.responseJSON);
    }
}
