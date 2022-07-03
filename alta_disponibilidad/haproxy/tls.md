https://mozilla.github.io/server-side-tls/ssl-config-generator/
Generador de configuración segura para haproxy

Parece que en 2.0 se podrá actualizar un certificado TLS con la API.

https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#5.1-crt
El .pem puede ser un concat de certificado, cas y key. También se puede poner el .dh (Diffie-Hellman)
Si ponemos un directorio, se leeran los ficheros en orden alfabético (excepto '.issuer', '.ocsp' or '.sctl')
O podemos poner varios crt: crt certificado crt clave
Si nos da error en los certs, veririficar que están correctamente concatenados, que los headers estén en líneas separadas, con el número adecuado de guiones, etc.
Verificar la key con:
openssl rsa -in *.key -check


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


## Chequeo estado backend
Podemos usar la opción
option ssl-hello-chk
Para ver si el backend funciona.
CUIDADO! según leo aquí https://github.com/kubernetes-sigs/bootkube/issues/960#issuecomment-379332080 el check que se hace es para SSLv3.
Si el backend es kubernetes apiserver, se quejará por que solo soporta TLS1.2 como mínimo.



# HTTP2
Simplemente añadir al bind "alpn h2,http/1.1". Ejemplo:

bind  *:443  ssl crt <certificate> alpn h2,http/1.1


# HSTS
Forzar al cliente a que solo conecte por https

16000000 seconds: a bit more than 6 months

http-response set-header Strict-Transport-Security "max-age=16000000; includeSubDomains; preload;"

