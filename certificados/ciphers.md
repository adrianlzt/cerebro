https://linux.die.net/man/1/ciphers


Verbose listing of all OpenSSL ciphers including NULL ciphers:
openssl ciphers -v 'ALL:eNULL'

Lista de ciphers usados por defecto por nginx:
openssl ciphers -v 'HIGH:!aNULL:!MD5'

Lista de ciphers recomendados por https://cipherli.st/
