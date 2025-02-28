const nodemailer = require('nodemailer')
const mailConfig = require('../config/mailConfig')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mailConfig.mail,
    pass: mailConfig.app_pass
  }
})

module.exports.sendMail = (receiver, message) => {
  transporter.sendMail(
    {
      from: mailConfig.mail,
      to: receiver,
      subject: 'Moderation decision',
      text: message
    },
    (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Email надіслано: ' + info.response)
    }
  )
}
