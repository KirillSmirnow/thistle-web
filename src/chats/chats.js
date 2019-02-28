// Initialize components

// On page loaded

if (localStorage.getItem("accessToken") == null) {
    signOut();
} else {
    switchToFriendsTab();
    updateProfile();
    updateFriends();
}

// Controls

function signOut() {
    localStorage.removeItem("accessToken");
    window.location.replace("/index.html");
}

// Actions

function updateProfile() {
    getProfile(function (profile) {
        $("#name").text(profile["firstName"] + " " + profile["lastName"]);
    });
}
