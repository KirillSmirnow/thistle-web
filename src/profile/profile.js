AUDIOS = [];
CURRENT_AUDIO = -1;
SEARCH_RESULT_ACCEPT_FLAG = false;

// Initialize components

document.getElementById("main-controls").addEventListener('ended', function () {
    playAudio(Number(CURRENT_AUDIO) + 1);
});

// On page loaded

if (localStorage.getItem("accessToken") == null) {
    signOut();
} else {
    updateProfile();
    updateAudios();
}

// Controls

function signOut() {
    localStorage.removeItem("accessToken");
    window.location.replace("/index.html");
}

function switchToPreviousTrack() {
    if ($("#main-controls").prop("paused")) {
        selectAudio(Number(CURRENT_AUDIO) - 1);
    } else {
        playAudio(Number(CURRENT_AUDIO) - 1);
    }
}

function switchToNextTrack() {
    if ($("#main-controls").prop("paused")) {
        selectAudio(Number(CURRENT_AUDIO) + 1);
    } else {
        playAudio(Number(CURRENT_AUDIO) + 1);
    }
}

function shuffle() {
    AUDIOS.sort((a, b) => Math.random() - 0.5);
    refreshAudios();
    playAudio(0);
}

function resetUploadForm() {
    $("#upload-form")[0].reset();
}

function submitUploadForm(event) {
    event.preventDefault();
    $("#upload-spinner").show();
    uploadAudio(document.getElementById("upload-form"), function () {
        $("#upload-close").click();
        $("#upload-spinner").hide();
        updateAudios();
    }, function () {
        $("#upload-spinner").hide();
    });
}

function search() {
    let query = $("#search").val();
    if (query.length < 3) {
        SEARCH_RESULT_ACCEPT_FLAG = false;
        updateAudios();
    } else {
        SEARCH_RESULT_ACCEPT_FLAG = true;
        searchAudio(query, function (result) {
            if (!SEARCH_RESULT_ACCEPT_FLAG) return;
            let currentAudioId = CURRENT_AUDIO < 0 ? -1 : AUDIOS[CURRENT_AUDIO].id;
            AUDIOS = result.mine;
            if (CURRENT_AUDIO >= 0) {
                CURRENT_AUDIO = AUDIOS.findIndex(value => value.id === currentAudioId);
            } else if (AUDIOS.length > 0) {
                CURRENT_AUDIO = 0;
                selectAudio(0);
            } else {
                CURRENT_AUDIO = -1;
            }
            refreshAudios();
        });
    }
}

// Actions

function playAudio(index) {
    if (index >= 0 && index < AUDIOS.length) {
        selectAudio(index);
        $("#main-controls")[0].play();
    }
}

function selectAudio(index) {
    if (index >= 0 && index < AUDIOS.length) {
        CURRENT_AUDIO = index;
        $("#audio-name").text(AUDIOS[index].name);
        $("#main-controls").attr("src", "http://thistle.ml" + AUDIOS[index].url);
    }
}

function updateProfile() {
    getProfile(function (profile) {
        $("#name").text(profile["firstName"] + " " + profile["lastName"]);
    });
}

function updateAudios() {
    let currentAudioId = CURRENT_AUDIO < 0 ? -1 : AUDIOS[CURRENT_AUDIO].id;
    getAudios(function (audiosRecords) {
        AUDIOS = audiosRecords;
        if (CURRENT_AUDIO >= 0) {
            CURRENT_AUDIO = AUDIOS.findIndex(value => value.id === currentAudioId);
        } else if (AUDIOS.length > 0) {
            CURRENT_AUDIO = 0;
            selectAudio(0);
        } else {
            CURRENT_AUDIO = -1;
        }
        refreshAudios();
    });
}

function refreshAudios() {
    $("#playlist").empty();
    for (let i in AUDIOS) {
        let element = $("<div>");
        $("#playlist").append(element);
        element.addClass("list-element");

        let playButton = $("<button>");
        element.append(playButton);
        playButton.addClass("play-button");
        playButton.text("▶️");
        playButton.click(function () {
            playAudio(i);
        });

        let audioName = $("<span>");
        element.append(audioName);
        audioName.addClass("audio-label");
        audioName.text(AUDIOS[i].name);

        let deleteButton = $("<button>");
        element.append(deleteButton);
        deleteButton.addClass("delete-button");
        deleteButton.text("🞩");
        deleteButton.click(function () {
            deleteAudio(AUDIOS[i].id, function () {
                element.hide();
            });
        });
    }
}
