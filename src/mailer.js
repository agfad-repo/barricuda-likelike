const nodemailer = require("nodemailer");

module.exports = {
    sendLogMail: function (host, user, pass, to, bcc, subject, content, fileName, fileUrl, callback) {
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
            console.silentLog("----- Message sent to: %s", to, bcc);
            if (callback) {
                callback();
            }
        }).catch(console.error);
    },
    sendMail: function(subject, content, fileName, fileUrl, callback) {
        this.sendLogMail(
            process.env.MAILHOST, 
            process.env.MAILUSER, 
            process.env.MAILPASS, 
            process.env.MAILTO, 
            process.env.MAILBCC,
            subject,
            content,
            fileName,
            fileUrl,
            callback
        );
    }
};

