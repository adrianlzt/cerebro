# http://www.sslshopper.com/article-most-common-openssl-commands.html
http://starnixhacks.blogspot.com.es/2010/06/openssl-command-is-amazing.html

Convert a DER file (.crt .cer .der) to PEM
openssl x509 -inform DER -in certificate.der -outform PEM -out certificate.pem

Convert a PEM file to DER
openssl x509 -outform der -in certificate.pem -out certificate.der

Convert a PKCS#12 file (.pfx .p12) containing a private key and certificates to PEM
openssl pkcs12 -in keyStore.pfx -out keyStore.pem -nodes
You can add -nocerts to only output the private key or add -nokeys to only output the certificates.
  Al generar el .pem me mete el certificado y de seguido la clave. Puedo borrar una de las partes para quedarme solo con la otra.

Convert a PEM certificate file and a private key to PKCS#12 (.pfx .p12)
openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CACert.crt

Convertir PKCS#7 (p7b) a un fichero con varios pem:
openssl pkcs7 -print_certs -in certs.p7b -out cert.pem


Comprobar certificado contra la autoridad:
http://www.openssl.org/docs/apps/verify.html
openssl verify -verbose -CAfile Certificate-Authority.crt user.pem 


# Ver certificado
https://raw.githubusercontent.com/adrianlzt/certificateReader/master/certificateReader.sh
certificateReader.sh

file fichero
  nos dice que tipo de encriptación lleva, según esa información usaremos un comando u otro
openssl rsa -pubout -in id_rsa
  clave pública de una clave privada

Datos de una clave privada (.key normalmente)
openssl rsa -text -in id_rsa

Datos de un certificado (crt, pem, etc)
openssl x509 -noout -text -in server.crt
  estos ficheros (encoding pem) son ficheros ascii
openssl x509 -noout -text -in server.der -inform der
  estos certificados son ficheros binarios

Mostrar todos los certificados (certificado + cadena) de un pkcs7
openssl pkcs7 -print_certs -text -noout -in fichero.p7b

Si el fichero .pem tiene varios certificados podemos ver todos con (con todos los certificados generamos un pkcs7 que luego mostramos):
openssl crl2pkcs7 -nocrl -certfile certificado.pem | openssl pkcs7 -print_certs -text -noout


openssl pkcs12 -info -in keyStore.p12
