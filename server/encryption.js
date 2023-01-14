const crypto = require("crypto-js")

module.exports.encrypt = (data, pass) => {
    return crypto.AES.encrypt(data, pass).toString();
   }
   
module.exports.decrypt = (data, pass) => {
    const bytes = crypto.AES.decrypt(data, pass)
    const originalText = bytes.toString(crypto.enc.Utf8);
    return originalText;
}
