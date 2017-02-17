http://crypto.stackexchange.com/questions/11310/with-openssl-and-ecdhe-how-to-show-the-actual-curve-being-used

Lista de curvas disponibles para ciphers ECDHE:
openssl ecparam -list_curves


Para navegadores se usan:
secp256r1 (OpenSSL uses the name prime256v1) and secp384r1.
