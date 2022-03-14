const nodemailer = require("nodemailer");

module.exports = {
    sendDebugMail: function (subject, content, fileName, fileUrl, callback) {
        let host = process.env.MAILHOST;
        let user = process.env.MAILUSER;
        let pass = process.env.MAILPASS;

        let to = process.env.DEBUGMAILTO;

        async function sendDebugMail() {
            let transporter = nodemailer.createTransport({
                host: host,
                port: 465,
                secure: true,
                auth: {
                    user: user,
                    pass: pass,
                },
            });
            let msg = {
                from: user,
                to: to,
                subject: subject,
                text: content,
            };

            if (fileName != null) {
                msg.attachments = {
                    filename: fileName,
                    path: fileUrl
                }
            }

            let message = await transporter.sendMail(msg);
        }

        sendDebugMail().then(function() {
            console.silentLog("----- Debug message sent to: " + to);
            if (callback) {
                callback();
            }
        }).catch(console.error);
    },
    
    sendMail: function (subject, content, fileName, fileUrl, callback) {
        let host = process.env.MAILHOST;
        let user = process.env.MAILUSER;
        let pass = process.env.MAILPASS;
        let to = process.env.MAILTO;
        let bcc = process.env.MAILBCC;

        async function sendMail() {
            let transporter = nodemailer.createTransport({
                host: host,
                port: 465,
                secure: true,
                auth: {
                    user: user,
                    pass: pass,
                },
            });
            let msg = {
                from: user,
                to: to,
                bcc: bcc,
                subject: subject,
                text: content,
            };

            if (fileName != null) {
                msg.attachments = {
                    filename: fileName,
                    path: fileUrl
                }
            }

            let message = await transporter.sendMail(msg);
        }

        sendMail().then(function() {
            console.silentLog("----- Message sent to: " + to + ', ' + bcc);
            if (callback) {
                callback();
            }
        }).catch(console.error);
    },
};

