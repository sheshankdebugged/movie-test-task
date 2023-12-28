var CryptoJS = require("crypto-js");
exports.Encrypt = function (text) {
    var chars = { '/': 'Por21Ld' };
    var crypted = CryptoJS.AES.encrypt(JSON.stringify({ text }), 'debuggedpropass').toString();
    let ciphertext
    if (crypted.indexOf("/") == -1)
        ciphertext = crypted
    else
        ciphertext = crypted.replace(/[/]/g, m => chars[m]);
    return ciphertext;
}
exports.Decrypt = function (text) {
    var chars = { 'Por21Ld': '/' };
    let newitem
    if (text.indexOf("Por21Ld") == -1)
        newitem = text
    else
        newitem = text.replace(/Por21Ld/g, m => chars[m]);
    var bytes = CryptoJS.AES.decrypt(newitem, 'debuggedpropass').toString(CryptoJS.enc.Utf8);
    const info3 = JSON.parse(bytes);
    var originalText = info3.text;
    return originalText;
}