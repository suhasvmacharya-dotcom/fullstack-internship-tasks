function postTweet() {
  const tweet = document.getElementById("tweetInput").value;
  const notifyEnabled = localStorage.getItem("notifyEnabled") === "true";

  if (!tweet) return;

  const text = tweet.toLowerCase();

  if (
    notifyEnabled &&
    text.includes("cricket") &&
    text.includes("science")
  ) {
    showNotification(tweet);
  }

  alert("Tweet Posted Successfully!");
}

function showNotification(tweetText) {
  if (Notification.permission === "granted") {
    new Notification("Tweet Alert 🐦", {
      body: tweetText
    });
  }
}
