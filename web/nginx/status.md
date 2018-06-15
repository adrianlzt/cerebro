http://nginx.org/en/docs/http/ngx_http_status_module.html
modulo detallado, de pago


http://nginx.org/en/docs/http/ngx_http_stub_status_module.html
http://rm-rf.es/habilitar-en-nginx-la-pagina-de-status/
módulo gratuito

configurar si está disponible:
nginx -V 2>&1 | grep -o with-http_stub_status_module


/etc/nginx/conf.d/status.conf
server {
  server_name 127.0.0.1;
  location /status {
    stub_status on;
    allow 127.0.0.1;
    deny all;
  }
}



# curl localhost:8000/status
Active connections: 1 
server accepts handled requests
 339126 339126 339126 
Reading: 0 Writing: 1 Waiting: 0 


Active connections
The current number of active client connections including Waiting connections.

accepts
The total number of accepted client connections.

handled
The total number of handled connections. Generally, the parameter value is the same as accepts unless some resource limits have been reached (for example, the worker_connections limit).

requests
The total number of client requests.

Reading
The current number of connections where nginx is reading the request header.

Writing
The current number of connections where nginx is writing the response back to the client.

Waiting
The current number of idle client connections waiting for a request.
