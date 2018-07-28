const winston = require('winston');

const logFormat = winston.format.printf((info) => {
  return info.message;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat)
    })
  ]
});

module.exports = logger;