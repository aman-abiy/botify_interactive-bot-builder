const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

module.exports = class SMTP {
    constructor(toEmail, subject, html) {
        this.toEmail = toEmail;
        this.subject = subject;
        this.html = html;
    }

    send() {
        let transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
                api_key: process.env.SMTP_API
            }
        }))
        transporter.sendMail({
            to: this.toEmail,
            from: process.env.SMTP_SENDER_EMAIL,
            subject: this.subject,
            html: this.html
        })
    }
}