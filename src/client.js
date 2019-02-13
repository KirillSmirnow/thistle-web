API = "api.thistle.ml";

function vkAuth(vkAuth, callback) {
    $.post({
        url: API + "/auth/vk",
        dataType: "json",
        data: JSON.stringify(vkAuth),
        success: function (response) {
            console.log(response);
        }
    });
}
