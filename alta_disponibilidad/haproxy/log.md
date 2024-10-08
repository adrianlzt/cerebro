https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#4.2-log

Lo normal es que haproxy envíe los logs a syslog (/dev/log).
Ahí los cojerá journald o syslog.

global
  log /dev/log local0

Configurar rsyslogd para enviar los logs de haproxy a un fichero:
https://www.youtube.com/watch?v=O64HDqtDrMw


Enviar a stdout o stderr (menor performance, porque no usan unbuffered logs https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#4.2-log mirar en "A file descriptor..."):
En este caso deberemos mirar el contador "DroppedLogs" para comprobar que no se estan dropeando mensajes.
global
  log stdout format raw daemon    # para docker
  log stdout format short daemon  # para systemd

Poner en defaults, "log global" para enviar los logs al logger definido en global.



# Log format
https://cbonte.github.io/haproxy-dconv/1.7/configuration.html#8.2.3
https://cdn.haproxy.com/wp-content/uploads/2017/07/aloha_load_balancer_memo_log.pdf
https://www.haproxy.com/blog/introduction-to-haproxy-logging/

Si queremos mostrar la línea completa tendremos que configurar
```
defaults
  option httplog
```

<30>Jun 27 21:43:42 haproxy[22021]: 8.6.7.10:55480 [27/Jun/2019:21:42:38.916] public_ssl~ be_http/srva 0/0/0/-1/63387    504 194 - - sH-- 15/13/10/0/0 0/0 "PATCH /api/upload/4ddad61736a6 HTTP/1.1"
<30>Jun 27 21:44:24 haproxy[22021]: 8.6.7.10:55480 [27/Jun/2019:21:43:53.199] public_ssl~ be_http/srva 0/0/1/30989/30990 409 299 - - ---- 14/12/10/2/0 0/0 "PATCH /api/upload/4ddad61736a6 HTTP/1.1"


haproxy[14389]: 10.0.1.2:33317 [06/Feb/2009:12:14:14.655] http-in static/srv1 10/0/30/69/109 200 2750 - - ---- 1/1/1/1/0 0/0 {1wt.eu} {} "GET /index.html HTTP/1.1"

Field   Format                                Extract from the example above
      1   process_name '[' pid ']:'                            haproxy[14389]:
      2   client_ip ':' client_port                             10.0.1.2:33317
      3   '[' request_date ']'                      [06/Feb/2009:12:14:14.655]
      4   frontend_name                                                http-in
      5   backend_name '/' server_name                             static/srv1
      6   TR '/' Tw '/' Tc '/' Tr '/' Ta*                       10/0/30/69/109
      7   status_code                                                      200
      8   bytes_read*                                                     2750
      9   captured_request_cookie                                            -
     10   captured_response_cookie                                           -
     11   termination_state                                               ----
     12   actconn '/' feconn '/' beconn '/' srv_conn '/' retries*    1/1/1/1/0
     13   srv_queue '/' backend_queue                                      0/0
     14   '{' captured_request_headers* '}'                   {haproxy.1wt.eu}
     15   '{' captured_response_headers* '}'                                {}
     16   '"' http_request '"'                      "GET /index.html HTTP/1.1"


## Timers

### HTTP
TR / Tw/ Tc / Tr / Ta
Ejemplo: 0/0/1/30989/30990


TR - The total time to get the client request (HTTP mode only).
Tw - The total time spent in the queues waiting for a connection slot.
Tc - The total time to establish the TCP connection to the server.
Tr - The server response time (HTTP mode only).
Ta - The total active time for the HTTP request (HTTP mode only).


## Termination code
https://cbonte.github.io/haproxy-dconv/1.7/configuration.html#8.5
Significado de los códigos

En http cuatro caracteres

Una respuesta con error será tipo:
<30>Apr 19 11:07:09 haproxy[25274]: 10.0.2.32:42174 [19/Apr/2020:11:07:09.283] public_istio_ssl_passthrough be_istio_https/<NOSRV> -1/-1/140 187 PR 3/1/0/0/3 0/0

Las siglas "PR" nos explican el error. Mirar en la web de esta sección.
