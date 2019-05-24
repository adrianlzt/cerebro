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


# SNI
Montar un frontend que escucha en tcp.
Si encontramos que es SSL miramos si tiene la extensión SNI (saber si nos está "leakeando" el host al que quiere conectar).
Según ese host decidimos si hacemos un "pasar tal cual" a un backend tcp.

frontend wss_prueba
  bind :8000
  mode tcp
  tcp-request  inspect-delay 5s
  tcp-request content accept if { req_ssl_hello_type 1 }


  use_backend be_tcp_wss_prod
  # if the connection is SNI and the route is a passthrough don't use the termination backend, just use the tcp backend
  #acl sni req.ssl_sni -m found
  #acl sni_passthrough req.ssl_sni,map_reg(/etc/haproxy/haproxy.d/sni_passthrough.map) -m found
  #use_backend be_tcp_%[req.ssl_sni,map_reg(/etc/haproxy/haproxy.d/tcp_be.map)] if sni sni_passthrough

  default_backend default
