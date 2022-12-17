const crypto = require('crypto')
const CryptoJS = require("crypto-js")
 
const encrypt = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENC_KEY, process.env.IV);
  let encrypted = cipher.update(val, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
});

const decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENC_KEY, process.env.IV);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  return (decrypted + decipher.final('utf8'));
}); 


module.exports = { encrypt,decrypt }