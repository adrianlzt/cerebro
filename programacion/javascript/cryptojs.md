https://github.com/brix/crypto-js/blob/1674e719b04bc7669fb6807756b5ec86cc7f2808/docs/QuickStartGuide.wiki#AES

Ejemplo usando AES-CBC y algunas particularidades para hablar con CryptoJS
https://gist.github.com/adrianlzt/d5c9657e205b57f687f528a5ac59fe0e


Cuidado que hay una vieja: https://github.com/sytelus/CryptoJS


Por defecto:
EvpKDF para la key y el IV a partir del passphrase
AES-256 mode CBC with PKCS5 (o PKCS7, es lo mismo)

El output lo da en base64 haciendo
"Salted__".concat(salt).concat(ciphertext)



Para sacar la clave en hex y devolverla a utf8:
k = CryptoJS.enc.Utf8.parse(passPhrase)
k.toString(CryptoJS.enc.Utf8)

Convertir hex a un Words:
salt = CryptoJS.format.Hex.parse("e0719d1d2e492f11").ciphertext

