http://www.openssl.org/docs/apps/ciphers.html


Verbose listing of all OpenSSL ciphers including NULL ciphers:
openssl ciphers -v 'ALL:eNULL'

Lista de ciphers usados por defecto por nginx:
openssl ciphers -v 'HIGH:!aNULL:!MD5'



Lista de ciphers recomendados https://cipherli.st/

Protocolos: TLSv1 TLSv1.1 TLSv1.2 (NO usar SSLv2 SSLv3)
Ciphers:
  EECDH+AESGCM
  EDH+AESGCM
  AES256+EECDH
  AES256+EDH
