const UAParser = require("ua-parser-js");

function detectDevice(req) {
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();

  return {
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
    device: result.device.type
      ? result.device.type.toLowerCase()   // mobile / tablet
      : "desktop"                          // laptop / desktop
  };
}

module.exports = detectDevice;
