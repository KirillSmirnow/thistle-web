FRIENDS = [];
IR = [];
OR = [];

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

function switchToFriendsTab() {
    $("#friends-tab").show();
    $("#ir-tab").hide();
    $("#or-tab").hide();
    $("#friends-label").addClass("selected");
    $("#ir-label").removeClass("selected");
    $("#or-label").removeClass("selected");
}

function switchToIncomingRequestsTab() {
    $("#friends-tab").hide();
    $("#ir-tab").show();
    $("#or-tab").hide();
    $("#friends-label").removeClass("selected");
    $("#ir-label").addClass("selected");
    $("#or-label").removeClass("selected");
}

function switchToOutgoingRequestsTab() {
    $("#friends-tab").hide();
    $("#ir-tab").hide();
    $("#or-tab").show();
    $("#friends-label").removeClass("selected");
    $("#ir-label").removeClass("selected");
    $("#or-label").addClass("selected");
}

function addVkFriends() {
    $("#vk-friends-content").text("No data");
    VK.init({apiId: 6764664});
    VK.Api.call("friends.get", {v: "5.73", fields: "first_name, last_name"}, function (result) {
        console.log(result);
        let friends = result.response.items;
        $("#vk-friends-content").empty();
        for (let i in friends) {
            let element = $("<div>");
            $("#vk-friends-content").append(element);
            element.addClass("list-element");

            let name = $("<span>");
            element.append(name);
            name.addClass("user-name");
            name.text(friends[i].first_name + " " + friends[i].last_name);

            let addButton = $("<button>");
            element.append(addButton);
            addButton.addClass("user-button");
            addButton.text("+");
            addButton.click(function () {
                addVkFriend(friends[i].id, function () {
                    $("#vk-friends-close-ref").click();
                    switchToOutgoingRequestsTab();
                    updateFriends();
                });
            });
        }
    });
}

// Actions

function updateProfile() {
    getProfile(function (profile) {
        $("#name").text(profile["firstName"] + " " + profile["lastName"]);
    });
}

function updateFriends() {
    getFriends(function (friendships) {
        FRIENDS = friendships.friends;
        IR = friendships.incomingRequests;
        OR = friendships.outgoingRequests;
        refreshFriends();
    });
}

function refreshFriends() {
    $("#friends-tab").empty();
    $("#ir-tab").empty();
    $("#or-tab").empty();

    for (let i in FRIENDS) {
        let element = $("<div>");
        $("#friends-tab").append(element);
        element.addClass("list-element");

        let name = $("<span>");
        element.append(name);
        name.addClass("user-name");
        name.text(FRIENDS[i].firstName + " " + FRIENDS[i].lastName);

        let removeButton = $("<button>");
        element.append(removeButton);
        removeButton.addClass("user-button");
        removeButton.text("🞩");
        removeButton.click(function () {
            unfollow(FRIENDS[i].id, updateFriends);
        });
    }

    for (let i in IR) {
        let element = $("<div>");
        $("#ir-tab").append(element);
        element.addClass("list-element");

        let name = $("<span>");
        element.append(name);
        name.addClass("user-name");
        name.text(IR[i].firstName + " " + IR[i].lastName);

        let acceptButton = $("<button>");
        element.append(acceptButton);
        acceptButton.addClass("user-button");
        acceptButton.text("✔");
        acceptButton.click(function () {
            follow(IR[i].id, updateFriends);
        });
    }

    for (let i in OR) {
        let element = $("<div>");
        $("#or-tab").append(element);
        element.addClass("list-element");

        let name = $("<span>");
        element.append(name);
        name.addClass("user-name");
        name.text(OR[i].firstName + " " + OR[i].lastName);

        let cancelButton = $("<button>");
        element.append(cancelButton);
        cancelButton.addClass("user-button");
        cancelButton.text("🞩");
        cancelButton.click(function () {
            unfollow(OR[i].id, updateFriends);
        });
    }
}
