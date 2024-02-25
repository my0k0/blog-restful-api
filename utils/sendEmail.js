const nodeemail = require('nodemailer')
const { EMAIL, EMAIL_PASS } = require('../configs/keys')

const sendEmail = async ({
  emailTo,
  subject,
  code,
  content
}) => {
  const transport = nodeemail.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS
    }
  })

  const message = {
    to: emailTo,
    subject,
    html: `
      <div>
        <h3>Use this below code to ${content}</h3>
        <p><strong>Code: </strong>${code}</p>
      </div>
    `
  }

  await transport.sendMail(message)
}

module.exports = sendEmail