const toggle = document.getElementById("notifyToggle");

// Load saved preference
toggle.checked = localStorage.getItem("notifyEnabled") === "true";

// Handle toggle
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        localStorage.setItem("notifyEnabled", "true");
      } else {
        toggle.checked = false;
        alert("Permission denied");
      }
    });
  } else {
    localStorage.setItem("notifyEnabled", "false");
  }
});
