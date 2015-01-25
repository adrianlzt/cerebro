http://nginx.org/en/docs/http/load_balancing.html
http://stackoverflow.com/questions/16283045/trouble-with-nginx-and-multiple-meteor-nodejs-apps/16289251#16289251

No hay problema porque uno de los nodos/sockets de upstream este apagado.
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
