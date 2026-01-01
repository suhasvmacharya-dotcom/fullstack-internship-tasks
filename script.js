async function login() {
  const emailInput = document.getElementById("email");
  const message = document.getElementById("message");

  if (!emailInput || !emailInput.value) {
    message.innerText = "Please enter email";
    message.style.color = "red";
    return;
  }

  const email = emailInput.value;

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      message.innerText = data.message || "Access denied";
      message.style.color = "red";
      return;
    }

    // Chrome → OTP required
    if (data.otpRequired) {
      localStorage.setItem("email", email);
      window.location.href = "otp.html";
      return;
    }

    // Edge → Direct login
    if (data.success) {
      localStorage.setItem("email", email);
      window.location.href = "history.html";
    }

  } catch (err) {
    console.error(err);
    message.innerText = "Server not running";
    message.style.color = "red";
  }
}
