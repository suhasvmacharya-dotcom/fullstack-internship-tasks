// ================================
// DOM Elements
const languageSelector = document.getElementById("languageSelector");
const welcomeText = document.getElementById("welcomeText");
const langLabel = document.getElementById("langLabel");

const authSection = document.getElementById("authSection");
const contactLabel = document.getElementById("contactLabel");
const contactInput = document.getElementById("contactInput");
const sendOTPBtn = document.getElementById("sendOTPBtn");

const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyBtn = document.getElementById("verifyBtn");

const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

let currentLang = "en";
let generatedOTP = "";

// ================================
// Load text based on language
function loadLanguage(lang) {
  const t = translations[lang];

  welcomeText.textContent = t.welcome;
  langLabel.textContent = t.language + ":";
  contactLabel.textContent = t.enterContact;
  sendOTPBtn.textContent = t.submit;
  verifyBtn.textContent = t.verify;
}

// ================================
// On language change
languageSelector.addEventListener("change", () => {
  currentLang = languageSelector.value;
  loadLanguage(currentLang);

  // Show auth section
  authSection.classList.remove("hidden");
  otpSection.classList.add("hidden");
  successMsg.classList.add("hidden");
  errorMsg.classList.add("hidden");
});

// ================================
// OTP Generation (Simulated)
function generateOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  alert("OTP: " + generatedOTP); // Demo — replace with actual API call
}

// ================================
// Send OTP Button
sendOTPBtn.addEventListener("click", () => {
  if (!contactInput.value.trim()) {
    alert("Enter contact");
    return;
  }

  generateOTP();
  otpSection.classList.remove("hidden");
});

// ================================
// Verify OTP
verifyBtn.addEventListener("click", () => {
  if (otpInput.value === generatedOTP) {
    successMsg.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  } else {
    errorMsg.classList.remove("hidden");
    successMsg.classList.add("hidden");
  }
});

// Initial load
loadLanguage(currentLang);
