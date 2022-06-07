const winston = require('winston')
// cargo las configuraciones del sistema de .ENV
const config = require("../config/config")

const {
  NODE_ENV
} = config.NODE_ENV


function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info'
      }),
      new winston.transports.File({
        filename: '../../logs/warn.log',
        level: 'warn'
      }),
      new winston.transports.File({
        filename: '../../logs/error.log',
        level: 'error'
      })
    ],
    format: winston.format.combine(
      winston.format.label({
        label: `Label🏷️`
      }),
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss'
      }),
      winston.format.align(),
      winston.format.printf(info => `${info.label} ${info.level}: ${[info.timestamp]} - ${info.message}`),
    )
  })
  return prodLogger
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info'
      }),
    ]
  })
  return devLogger
}

let logger = null

if (NODE_ENV === 'PROD') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

module.exports = logger