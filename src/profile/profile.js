// TEST
localStorage.setItem("accessToken", "OAzq4tN8JyNKXuzVhSImhPZGH1EHXve6vxCsLLWOsJ2GBB559g3mb7w3ItFVTb4Dgc1KO0oDku8RkX3U71NxBmhrVG2CDfW2YqKg3vrVsuxweupLRRAdZ7VmjJy4qYbM");

const accessToken = localStorage.getItem("accessToken");
if (accessToken == null) {
    window.location.replace("/index.html");
} else {
    getProfile(function (profile) {
        $("#name").text(profile["firstName"] + " " + profile["lastName"]);
    })
}
