/*
 * CryptoJS by default:
 * - uses OFB mode
 * - append randomly generated IV to the encrypted string
 * - use key as encryption key if is not a string, otherwise uses PBKDF2(password, iv, 32)
 */

var Crypto = require('cryptojs');
Crypto = Crypto.Crypto;

var key = 'somekey';
var plaintext = 'some secret';

var encrypted_b64 = Crypto.AES.encrypt(plaintext, key);
console.log("encrypted_text (base64)="+encrypted_b64);

output_plaintext = Crypto.AES.decrypt(encrypted_b64, key);
console.log("decrypted text='"+output_plaintext+"'");
