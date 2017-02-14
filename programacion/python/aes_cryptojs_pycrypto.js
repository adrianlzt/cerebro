/*
 * CryptoJS by default:
 * - uses CBC mode
 * - pkcs7 for padding
 * - evpKDF to extract key
 * - part of the key is used as IV
 * - before converting to base64 it makes "Salt__"+salt+encrypted_text
 */

var CryptoJS = require('crypto-js');

var key = 'mysecretkey';
var plaintext = 'secret text';

var encrypted_b64 = CryptoJS.AES.encrypt(plaintext, key);
console.log("encrypted_text (base64) = "+encrypted_b64);

//output_plaintext = CryptoJS.AES.decrypt(encrypted_b64, key);
var bytes = CryptoJS.AES.decrypt("U2FsdGVkX1+9Wl/biuWHpFKFWo1af8aF14CW/zJjw8c=", key);
var output_plaintext = bytes.toString(CryptoJS.enc.Utf8);

console.log("decrypted text = "+output_plaintext);
