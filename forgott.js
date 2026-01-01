function requestReset() {
  const contact = document.getElementById("contact").value;
  const message = document.getElementById("message");

  if (!contact) {
    message.innerText = "Please enter email or phone number";
    return;
  }

  const today = new Date().toDateString();
  const lastRequest = localStorage.getItem("lastResetDate");

  // Allow only once per day
  if (lastRequest === today) {
    message.innerText = "You can request forgot password only once a day";
    message.style.color = "red";
    return;
  }

  // Generate password
  const newPassword = generatePassword(10);

  // Save request date
  localStorage.setItem("lastResetDate", today);

  message.innerText =
    "Password reset successful. Your new password is: " + newPassword;
  message.style.color = "green";
}

// Password Generator
function generatePassword(length) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += letters.charAt(
      Math.floor(Math.random() * letters.length)
    );
  }

  return password;
}
