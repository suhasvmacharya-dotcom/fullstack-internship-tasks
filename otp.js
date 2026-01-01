const nodemailer = require("nodemailer");

let otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendOTP(email) {
  const otp = generateOTP();
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password"
    }
  });

  await transporter.sendMail({
    from: "Login System",
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`
  });
}

module.exports = { sendOTP, otpStore };
