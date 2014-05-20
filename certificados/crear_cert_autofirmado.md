http://www.cyberciti.biz/faq/nginx-self-signed-certificate-tutorial-on-centos-redhat-linux/

openssl genrsa -des3 -out self-ssl.key 2048
  generate an SSL private key
  If you don't want your key to be protected by a password, remove the flag '-des3' from the command line

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
