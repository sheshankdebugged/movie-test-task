let nodemailer = require('nodemailer');
exports.emailAddress = ''
exports.dProTransporter = nodemailer.createTransport({
    host: '',
    port: "",
    secure: false,
    auth: {
        user: '',
        pass: ''
    }, tls: {
        rejectUnauthorized: false
    }
});


