VK.init({apiId: 6764664});

VK.Widgets.Auth("vk_auth", {
    "width": 400, "onAuth": function (data) {
        vkAuth({
            "vkId": data["uid"],
            "hash": data["hash"],
            "firstName": data["first_name"],
            "lastName": data["last_name"],
            "photo": data["photo"]
        }, signInSuccess);
    }
});

function signInSuccess() {
    window.location.replace("/profile/profile.html");
}
