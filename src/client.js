API = "http://api.thistle.ml";

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

function error(response) {
    console.log("Error: " + response.responseJSON.developerMessage);
    alert(response.responseJSON.userMessage);
}
