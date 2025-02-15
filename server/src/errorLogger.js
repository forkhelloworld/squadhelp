const fs = require('fs/promises')
const path = require('path')
const cron = require('node-cron')
const CONSTANTS = require('./constants')

module.exports.logError = error => {
  const code = error.code || 500
  const logFilePath = path.resolve(CONSTANTS.LOGS_FILE_PATH)
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

const backup = async () => {
  const logFilePath = path.resolve(CONSTANTS.LOGS_FILE_PATH)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFilePath = path.resolve(
    CONSTANTS.LOGS_PATH,
    `backup-${timestamp}.json`
  )

  try {
    const data = await fs.readFile(logFilePath, 'utf-8')
    let logs
    try {
      logs = JSON.parse(data)
    } catch (err) {
      console.error('Error parsing file:', err)
      return
    }

    const transformedLogs = logs.map(log => ({
      message: log.message,
      code: log.code,
      time: log.time
    }))

    await fs.writeFile(
      backupFilePath,
      JSON.stringify(transformedLogs, null, 2),
      'utf8'
    )

    await fs.writeFile(logFilePath, '[]', 'utf8')
  } catch (error) {
    console.error('Error processing logs:', error)
  }
}

cron.schedule('0 0 * * *', async () => {
  await backup()
})
