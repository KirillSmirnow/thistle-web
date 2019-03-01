function formatMessageTime(timestamp) {
    let time = new Date(timestamp + "Z");
    return time.toLocaleString("en", {month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"});
}
