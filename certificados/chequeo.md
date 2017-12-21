Si la web es accesible desde internet podemos pedir a esta web que nos de un resumen de su análisis:
https://www.ssllabs.com/ssltest/

También podemos usar esta herramienta: http://www.bolet.org/TestSSLServer/
yaourt -S aur/testsslserver
/usr/bin/TestSSLServer www1.agenciatributaria.gob.es

Chequear si el certificado (cert.cer) esta firmado por myca.pem (CApath a /dev/null para que no use la del sistema)
openssl verify -CApath /dev/null -CAfile myca.pem /tmp/cert.cer

Comprobar el certificado de una web:
gnutls-cli google.es
  podemos especificar el puerto con -p xxx

  openssl s_client -showcerts -connect google.es:443
  NO USAR, no chequea si el CN es correcto

Si estamos atacando un virtualhost:
gnutls-cli google.es
  openssl s_client -showcerts -connect pre.vhost.es:443 -servername pre.vhost.es
  NO USAR, no chequea si el CN es correcto

Para coger el certificado:
gnutls-cli --save-cert=goo.crt google.es

Si estamos con openssl tendremos que cortar:
"-----BEGIN CERTIFICATE-----" y "-----END CERTIFICATE-----", incluyendo ambas líneas.


Podemos meter los certificados de la autoridades certificadoras con:
openssl s_client -CApath /ruta/certs/ ...

Si queremos pasar un fichero .pem con la autoridad, hay que pasar la cadena entera de certificacion.
Meter en un mismo fichero toda la cadena y hacer
openssl s_client -CAfile fichero.pem -connect ...


If you use the 'openssl' tool, this is one way to get extract the CA cert for a particular server:
openssl s_client -connect xxxxx.com:443 |tee logfile
type "QUIT", followed by the "ENTER" key
The certificate will have "BEGIN CERTIFICATE" and "END CERTIFICATE" markers.
If you want to see the data in the certificate, you can do: "openssl x509 -inform PEM -in certfile -text -out certdata" where certfile is the cert you extracted from logfile. Look in certdata.
If you want to trust the certificate, you can append it to your cert bundle or use it stand-alone as described. Just remember that the security is no better than the way you obtained the certificate.


# Comprobar que un certificado o CSR pertenece a una clave
https://kb.wisc.edu/middleware/page.php?id=4064
https://www.sslshopper.com/certificate-key-matcher.html

diff <(openssl x509 -noout -modulus -in *.crt) <(openssl rsa -noout -modulus -in *.key); echo $?

Si devuelve 0, sin otros errores, es que el crt corresponde a la key


El crt (certificado), privatekey y csr (certificate signing request) deben tener el mismo modulus:
openssl x509 -noout -modulus -in certificate.crt | openssl md5
openssl rsa -noout -modulus -in privateKey.key | openssl md5
openssl req -noout -modulus -in CSR.csr | openssl md5
