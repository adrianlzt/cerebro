# cliente basico
man s_client

openssl s_client -connect example.com:443



# HowTo
http://www.madboa.com/geek/openssl/

The openssl application that ships with the OpenSSL libraries can perform a wide range of crypto operations. This HOWTO provides some cookbook-style recipes for using it.


# Encriptar un fichero con des3
openssl des3 -salt -in "test" -out "test.des3"
  nos pregunta la contraseña via prompt

Encriptar pasando la pass por parametro y generando un fichero base64
openssl des3 -salt -k prueba -a -in "test" -out "test.des3"

Pasando por stdin
echo "texto" | openssl des3 -salt -k prueba -a -out "test.des3"

# Desencriptar
openssl des3 -d -salt -in "test.des3" -out "test"

Pasando pass por parametro y leyendo base64
openssl des3 -d -salt -k prueba -a -in "test" -out "test"




# RSA
Encriptación asimétrica (clave pública - clave privada)
https://github.com/bobvanluijt/Bitcoin-explained/blob/master/RSA.js
ejemplo de implementacion

Se deben usar claves de al menos 2048 bits, 1024 puede que sean inseguras.

https://www.openssl.org/docs/manmaster/man1/rsautl.html

echo 'Hi Alice! Please bring malacpörkölt for dinner!' |
openssl rsautl -encrypt -pubin -inkey alice.pub >message.encrypted

Desencriptar:
openssl rsautl -decrypt -in encryptedtext -out plaintext -inkey private.pem
  Si nos da el error: routines:RSA_EAY_PRIVATE_DECRYPT:data greater than mod len:rsa_eay.c:506:
  Hacer:
    openssl enc -in ciphertext -out binarytext -d -a
    openssl rsautl -decrypt -in binarytext -out plaintext -inkey private.pem



Padding:
PKCS#1 (ver <=1.5) no es seguro (Eurocrypt 2000, Coron et al), usar OAEP

Las claves RSA de 1024bits tienen 15 lineas (NO SEGURO!)
Las de 2048bits 27 líneas

RSA es sintácticamente seguro, devuelve distintos valores para el mismo mensaje encriptado.




# AES
Encriptación simétrica

Para algunos de sus modos (CBC o CBF) se usa un vector de inicialización (IV) que suele elegirse de forma aleatoria. Con esto conseguimos que sea semánticamente segura la encriptación.
Este IV se añade al texto a encriptar y luego se añadre al texto encriptado.
Algo así:
IV = "sd77h85tg" (algo random)
ciphertext = encriptar(IV+mensaje)
texto_a_enviar = IV+ciphertext

Si predefinimos el IV, para el mismo texto de entrada siempre tendremos la misma cadena de salida.


OFB no necesita padding.
