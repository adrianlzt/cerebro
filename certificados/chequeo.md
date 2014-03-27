Comprobar el certificado de una web:
openssl s_client -showcerts -connect google.es:443

Podemos guardar el certificando copiando entre:
"-----BEGIN CERTIFICATE-----" y "-----END CERTIFICATE-----", incluyendo ambas líneas.


Podemos meter los certificados de la autoridades certificadoras con:
openssl s_client -CApath /ruta/certs/ ...
