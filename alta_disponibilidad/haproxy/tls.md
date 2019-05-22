Parece que en 2.0 se podrá actualizar un certificado TLS con la API.

https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#5.1-crt
El .pem puede ser un concat de certificado, cas y key. También se puede poner el .dh (Diffie-Hellman)
Si ponemos un directorio, se leeran los ficheros en orden alfabético (excepto '.issuer', '.ocsp' or '.sctl')
O podemos poner varios crt: crt certificado crt clave

Ejemplo básico:
frontend www.mysite.com
    bind 10.0.0.3:80
    bind 10.0.0.3:443 ssl crt /etc/ssl/certs/mysite.pem

Otro ejemplo:
frontend fe_sni
  # terminate ssl on edge
  bind 127.0.0.1:10444 ssl no-sslv3 crt /etc/pki/tls/private/tls.crt crt-list /var/lib/haproxy/conf/cert_config.map accept-proxy

