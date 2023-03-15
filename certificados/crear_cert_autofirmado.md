mirar mkcert.md
mirar cfssl.md
https://easy-rsa.readthedocs.io/en/latest/

https://github.com/minio/certgen
certgen is a simple tool to generate self-signed certificates, and provides SAN certificates with DNS and IP entries.
certgen-linux-amd64 --host localhost,172.30.110.145,127.0.0.1

http://www.cyberciti.biz/faq/nginx-self-signed-certificate-tutorial-on-centos-redhat-linux/

En RedHat/CentOS usar
/etc/pki/tls/certs/Makefile


openssl req -batch -new -x509 -days 365 -nodes -out server.pem -keyout server.key
  generar cert autofirmado un año

Probarlo:
python3 -m http.server 8080 &  ncat -l 8443 --sh-exec "ncat 127.0.0.1 8080" --keep-open --ssl --ssl-cert server.pem --ssl-key server.key


Otra forma generando la autoridad:
openssl genrsa -out self-ssl.key 2048
  generate an SSL private key
  If you want your key to be protected by a password, add the flag '-des3' from the command line

openssl req -new -key self-ssl.key -out self-ssl.csr
  generate a CSR

You can remove passphrase from self-ssl.key for nginx server:
  cp -v self-ssl.{key,original}
  openssl rsa -in self-ssl.original -out self-ssl.key
  rm -v self-ssl.original

generate SSL certificate i.e. sign your SSL certificate with your own .csr file for one year:
  openssl x509 -req -days 365 -in self-ssl.csr -signkey self-ssl.key -out self-ssl.crt


self-ssl.crt ~= self-ssl.pem


openssl genrsa -out cert.key 2048
openssl req -new -key cert.key -out cert.csr
openssl x509 -req -days 365 -in cert.csr -signkey cert.key -out cert.pem


Generar CA
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -sha256 -days 10000 -out ca.pem
openssl x509 -req -days 10000 -in ca.csr -signkey ca.key -out ca.pem

Ahora crear un cert y firmarlo con esa CA
openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr

Si queremos añadir extensiones X509, por ejemplo para alternative names, mirar https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/#:~:text=Finally%2C%20we%E2%80%99ll%20create%20an

openssl x509 -req -in client.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out client.crt -days 10000 -sha256
