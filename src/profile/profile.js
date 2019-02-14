audios = [];
currentAudio = -1;

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
        selectAudio(0);
    });
}

document.getElementById("main-controls").addEventListener('ended', function () {
    playAudio(Number(currentAudio) + 1);
});
document.getElementById("main-controls").addEventListener('error', function () {
    playAudio(Number(currentAudio) + 1);
});

$("#previous").click(function () {
    if ($("#main-controls").prop("paused")) {
        selectAudio(Number(currentAudio) - 1);
    } else {
        playAudio(Number(currentAudio) - 1);
    }
});
$("#next").click(function () {
    if ($("#main-controls").prop("paused")) {
        selectAudio(Number(currentAudio) + 1);
    } else {
        playAudio(Number(currentAudio) + 1);
    }
});

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
            playAudio(i);
        });

        let audioName = $("<span>");
        element.append(audioName);
        audioName.text(audios[i].name);
    }
}

function selectAudio(index) {
    if (index >= 0 && index < audios.length) {
        currentAudio = index;
        $("#audio-name").text(audios[index].name);
        $("#main-controls").attr("src", "http://thistle.ml" + audios[index].url);
    }
}

function playAudio(index) {
    if (index >= 0 && index < audios.length) {
        selectAudio(index);
        $("#main-controls")[0].play();
    }
}
