# http://www.sslshopper.com/article-most-common-openssl-commands.html

pxf: llave + certificado unidos
pem / cer: certificados
key: llave


Convert a DER file (.crt .cer .der) to PEM
openssl x509 -in certificate.crt -out certificate.der -outform DER
openssl x509 -inform DER -in certificate.der -outform PEM -out certificate.pem

Convert a PEM file to DER
openssl x509 -outform der -in certificate.pem -out certificate.der

Convert a PKCS#12 file (.pfx .p12) containing a private key and certificates to PEM
openssl pkcs12 -in keyStore.pfx -out keyStore.pem -nodes
You can add -nocerts to only output the private key or add -nokeys to only output the certificates.
  Al generar el .pem me mete el certificado y de seguido la clave. Puedo borrar una de las partes para quedarme solo con la otra.

Convert a PEM certificate file and a private key to PKCS#12 (.pfx .p12)
openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CACert.crt


Comprobar certificado contra la autoridad:
http://www.openssl.org/docs/apps/verify.html
openssl verify -verbose -CAfile Certificate-Authority.crt user.pem 


Ver certificado
file fichero
  nos dice que tipo de encriptación lleva, según esa información usaremos un comando u otro
openssl rsa -pubout -in id_rsa
  clave pública de una clave privada
openssl rsa -text -in id_rsa
openssl x509 -noout -text -in certs/server.pem 
openssl pkcs12 -info -in keyStore.p12
