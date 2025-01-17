// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendMail = (email, name, passCode) => {
  sgMail.send({
      to: email, // receiver email address
      from: process.env.SENDGRID_FROM_EMAIL, 
      templateId: process.env.SENDGRID_PASSWORD_RESET_TEMPLATE,
      dynamic_template_data: {
        name: name,
        passCode: passCode
      },
      
  })
}

module.exports = {
  sendMail
}
  