var path = require('path');
let link = app_link.URLS;
var verifyAccount = path.join(__dirname, 'html/File Name Html');
var handlebars = require('handlebars');
var fs = require('fs');

exports.SendEmail = function (emailData, emailCase) {
  let EmailSubject = '';
  let EmailHtml = '';
  switch (emailCase) {
    case 'verifyAccount':
      EmailSubject = 'Verify Your Account';
      EmailHtml = readHTMLFile(verifyAccount, function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          firstName: emailData.firstName,
          verifyLink: link.verifyAccount + emailData.EncryptedUserId,
          SiteLink: link.siteLink,
        };
        var EmailHtml = template(replacements);
        const mailOptions = {
          from: emailTransporter.emailAddress, // sender address
          to: emailData.email, // list of receivers
          subject: EmailSubject, // Subject line
          html: EmailHtml,
          attachments: [
          {
            filename: '',

            path: path.join(__dirname, 'File Name'),
            cid: '' //same cid value as in the html img src
          },
          {
            filename: '',

            path: path.join(__dirname, 'File Name'),
            cid: 'activate' //same cid value as in the html img src
          },
          {
            filename: '',

            path: path.join(__dirname, 'File Name'),
            cid: '' //same cid value as in the html img src
          }],
          

        };
        emailTransporter.dProTransporter.sendMail(mailOptions, function (err, info) {
          if (err)
            console.log(err)
          else
            console.log(info);
        });
      });
      break;
    default:
      EmailSubject = emailData.subject;
      EmailHtml = "<!DOCTYPE html><html><body><p>Hi " + emailData.firstName + "<br>You are invited to asphalt portal. Please click <a href='" + link.verifyAccount + emailData.EncryptedUserId + "' target='_top'>here</a> to get started</p><p></body></html>"// plain text body
      break;

  }
}
var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      return '';
    }
    else {
      callback(null, html);
    }
  });
};
