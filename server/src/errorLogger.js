const fs = require('fs/promises')
const path = require('path')
const CONSTANTS = require('./constants')

module.exports.logError = error => {
  const code = error.code || 500
  const logFilePath = path.resolve(CONSTANTS.LOGS_PATH)
  const logEntry = {
    message: error.message || 'Unknown error',
    time: Date.now(),
    code: code,
    stackTrace: error.stack || {}
  }

  fs.readFile(logFilePath, 'utf-8').then(data => {
    let logs = []
    if (data) {
      logs = JSON.parse(data)
    }

    logs.push(logEntry)
    fs.writeFile(
      logFilePath,
      JSON.stringify(logs, null, 2),
      'utf8',
      writeErr => {
        if (writeErr) {
          console.error('Failed to write to log file', writeErr)
        }
      }
    )
  })
}
