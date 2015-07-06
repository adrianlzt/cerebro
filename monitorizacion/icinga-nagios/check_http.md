Hace un:
GET / HTTP/1.0
User-Agent: check_http/v1.5 (nagios-plugins 1.5)
Connection: close

Y espera una conex http


Certificados:
check_http -H pre.web.es -C 10
warning si caduca en menos de 10 días, critical si ha caducado

Si estamos atacando a un vhost tendremos que poner la opción --sni
  check_http 1.4.14 introduced SSL SNI support - you now have to enable it explicitly with "--sni"

