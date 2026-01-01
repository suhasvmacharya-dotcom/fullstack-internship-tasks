const express = require("express");
const router = express.Router();
const db = require("../db");
const detectDevice = require("../utils/detectDevice");
const { sendOTP, otpStore } = require("../utils/otp");

router.post("/login", async (req, res) => {
  const { email } = req.body;
  const { browser, os, device } = detectDevice(req);
  const ip = req.ip;
  const now = new Date();
  const hour = now.getHours();

  // ❌ Mobile time restriction
  if (device === "mobile" && (hour < 10 || hour >= 13)) {
    return res.status(403).json({ message: "Mobile access allowed only 10AM–1PM" });
  }

  // ✅ Chrome → OTP
  if (browser === "Chrome") {
    await sendOTP(email);
    return res.json({ otpRequired: true });
  }

  // ✅ Edge → No auth
  if (browser === "Edge") {
    saveLogin();
    return res.json({ success: true });
  }

  function saveLogin() {
    db.query(
      "INSERT INTO login_history (email, ip_address, browser, os, device_type, login_time) VALUES (?, ?, ?, ?, ?, ?)",
      [email, ip, browser, os, device, now]
    );
  }
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] == otp) {
    res.json({ success: true });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

router.get("/history/:email", (req, res) => {
  db.query(
    "SELECT * FROM login_history WHERE email=?",
    [req.params.email],
    (err, result) => res.json(result)
  );
});

module.exports = router;
