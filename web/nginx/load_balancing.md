http://nginx.org/en/docs/http/load_balancing.html
http://stackoverflow.com/questions/16283045/trouble-with-nginx-and-multiple-meteor-nodejs-apps/16289251#16289251

Balanceo de tráfico TCP o UDP: mirar más abajo

CUIDADO!
No tiene check health en la versión grauita.
Tiene un funcionamiento en que es capaz de pasar la peticion a otro nodo si uno del grupo upstream falla.

Incluso si todos estan apagados, pero nginx no intenta enrutar a esa dirección, no habrá problemas.

Conf simple:
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}

# Check health
Solo para la versión de pago.
http://nginx.org/en/docs/http/ngx_http_upstream_module.html#health_check

Para la verión gratuita tenemos que usar:
http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream

location / {
  proxy_pass http://grupo_upstream;
  proxy_set_header  X-Real-IP  $remote_addr;
  proxy_next_upstream error http_502;
}

upstream grupo_upstream {
  server 172.16.2.26:8002 max_fails=1 fail_timeout=20s;
  server 172.16.2.25:8002 max_fails=1 fail_timeout=20s;
  server 172.16.2.24:8002 max_fails=1 fail_timeout=20s;
}


Con esto haremos que si al contactar con uno de los servidores del grupo_upstream y recibe un error o un codigo http 502, marcará el nodo como erróneo durante 20s y enviará la petición automáticamente a otro servidor.

Error: an error occurred while establishing a connection with the server, passing a request to it, or reading the response header;

max_fails, el número de veces que se probará el mismo servidor. La primera petición se intentará enviar, fallará y se enviará a otro servidor. En la segunda petición, se enviará al servidor, fallará, se marcara como erróneo, y se enviará a otro servidor.

fail_timeout, nos indica el tiempo que el nodo se marcará como fallido.


Los errores 50x hay que definirlos explícitamente si queremos que se consideren un error.
Si el servidor upstream es un nginx que reenvia, por ejemplo, a un uwsgi. Si el uwsgi falla nginx-upstream contesta con:
502 Bad Gateway




# Enrutando por URL
https://evolution.voxeo.com/wiki/kb:swloadbalancingfailover#nginx:_Routing_by_incoming_URL

http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }
    upstream myapp2 {
        server srv1.example.com:8000;
        server srv2.example.com:8000;
        server srv3.example.com:8002;
    }

    server {
        listen 80;

        location ~ /projects/.*/alarms {
            proxy_pass http://cyclops_alarmer;
            proxy_set_header  X-Real-IP  $remote_addr;
        }

        location / {
            proxy_pass http://myapp1;
        }
    }
}



Para usar http 1.1 y mantener las conexiones activas entre el balanceador y el endpoint http:
proxy_pass http://cyclops_provisioner;
proxy_http_version 1.1;
proxy_set_header Connection "";

Mirar traza de como funciona un balanceador con esto en privado: web/nginx/captura-balanceo-conex-persistentes-nginx.cap
 - cliente establece el triple handshake contra el balanceador
 - envia la peticion http
 - el LB envia la peticion http a uno de los servers del pool (sin tripe hand shake)
 - el server del pool devuelve un http OK
 - el LB devuelve al el cliente el http OK
 - el cliente envia un TCP FIN al LB
 - el LB envia FIN+ACK



# TCP Load balancing
https://www.nginx.com/resources/admin-guide/tcp-load-balancing/#intro
