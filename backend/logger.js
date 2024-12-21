const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize, prettyPrint } = format;

// Custom timestamp format to convert it to IST
const istTimestampFormat = format((info) => {
  const timestamp = new Date();
  const istTimestamp = timestamp.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24-hour format
  });
  info.timestamp = istTimestamp;
  return info;
});

// Create a Winston logger
const logger = createLogger({
  level: 'http',
  format: combine(istTimestampFormat(), json(), prettyPrint()),
  transports: [new transports.File({ filename: 'app.log' })],
});

module.exports = logger;
