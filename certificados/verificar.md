Para comprobar que un certificado lo ha firmado una CA determinada:

certificate_verify.py -c certificado_servidor.pem -a ca.pem -a ca_intermedia.pem

Los ficheos deben ser tipo pem (X509, codificación base64)

Pueden haber varios certificados concatenados. "ca.pem" por ejemplo puede tener dentro el certificado de la ca más un certificado intermedio.


Si el certificado del servidor lleva alguna autoridad certificadora adjunto, tendremos que separarlo y pasarlo con el parámetro -a



# Openssl
http://www.openssl.org/docs/apps/verify.html
openssl verify -verbose -CApath /dev/null -CAfile Certificate-Authority.crt user.pem 

Hay que tener cuidado con el comando openssl, porque puede coger los certificados del SO

No podemos crear un dir para pasarlo a CAfile, necesita un formato especial.
Si no pasamos un dir valido, usa el del SO.




# Comprobar que un certificado o CSR pertenece a una clave
https://kb.wisc.edu/middleware/page.php?id=4064
https://www.sslshopper.com/certificate-key-matcher.html

diff <(openssl x509 -noout -modulus -in *.crt) <(openssl rsa -noout -modulus -in *.key); echo $?

Si devuelve 0, sin otros errores, es que el crt corresponde a la key
