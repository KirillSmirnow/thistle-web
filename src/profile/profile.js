// TEST
localStorage.setItem("accessToken", "OAzq4tN8JyNKXuzVhSImhPZGH1EHXve6vxCsLLWOsJ2GBB559g3mb7w3ItFVTb4Dgc1KO0oDku8RkX3U71NxBmhrVG2CDfW2YqKg3vrVsuxweupLRRAdZ7VmjJy4qYbM");

audios = [];
const accessToken = localStorage.getItem("accessToken");

if (accessToken == null) {
    window.location.replace("/index.html");
} else {
    getProfile(function (profile) {
        $("#name").text(profile["firstName"] + " " + profile["lastName"]);
    });

    getAudios(function (audiosRecords) {
        audios = audiosRecords;
        refreshAudios();
    });
}

function refreshAudios() {
    $("#playlist").empty();
    for (let i in audios) {
        let element = $("<div>");
        $("#playlist").append(element);
        element.addClass("list-element");

        let playButton = $("<button>");
        element.append(playButton);
        playButton.addClass("play-button");
        playButton.text("Play");
        playButton.click(function () {
            console.log("Play " + i);
            $("#main-controls").attr("src", "http://thistle.ml" + audios[i].url);
            $("#main-controls")[0].play();
        });

        let audioName = $("<span>");
        element.append(audioName);
        audioName.text(audios[i].name);
    }
}
